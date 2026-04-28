import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getBlogs, getBlogById } from '../api';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedTag, setSelectedTag] = useState('all');
  const [allTags, setAllTags] = useState(['all']);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await getBlogs();
      setBlogs(response.data);
      
      // Extract unique tags
      const tags = new Set();
      response.data.forEach(blog => {
        blog.tags?.forEach(tag => tags.add(tag));
      });
      setAllTags(['all', ...Array.from(tags)]);
    } catch (error) {
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleReadMore = async (id) => {
    try {
      const response = await getBlogById(id);
      setSelectedBlog(response.data);
    } catch (error) {
      toast.error('Failed to load blog details');
    }
  };

  const filteredBlogs = selectedTag === 'all'
    ? blogs
    : blogs.filter(blog => blog.tags?.includes(selectedTag));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading blogs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600">Insights, stories, and updates from our community</p>
        </div>

        {/* Tag Filter */}
        {allTags.length > 1 && (
          <div className="flex justify-center mb-8 space-x-2 flex-wrap">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full capitalize mb-2 ${
                  selectedTag === tag
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {filteredBlogs.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No blogs found with the selected tag.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} onReadMore={handleReadMore} />
            ))}
          </div>
        )}

        {/* Blog Modal */}
        {selectedBlog && (
          <BlogModal
            blog={selectedBlog}
            onClose={() => setSelectedBlog(null)}
          />
        )}
      </div>
    </div>
  );
};

const BlogCard = ({ blog, onReadMore }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    {blog.coverImage && (
      <img
        src={blog.coverImage}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
    )}
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{blog.title}</h2>
      <p className="text-gray-600 mb-4 line-clamp-3">
        {blog.excerpt || blog.content.substring(0, 150)}...
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {blog.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">By {blog.author}</p>
          <p className="text-xs text-gray-500">
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={() => onReadMore(blog._id)}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Read More →
        </button>
      </div>
    </div>
  </div>
);

const BlogModal = ({ blog, onClose }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {blog.coverImage && (
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-96 object-cover"
        />
      )}
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-3xl font-bold">{blog.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <span>By {blog.author}</span>
          <span className="mx-2">•</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>{blog.views} views</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap">{blog.content}</p>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          Last updated: {new Date(blog.updatedAt).toLocaleString()}
        </div>
      </div>
    </div>
  </div>
);

export default Blog;