import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  getGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage
} from '../../api';

const GalleryAdmin = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [inputMethod, setInputMethod] = useState('file'); // 'file' or 'url'
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general',
    mediaType: 'image',
    media: null,
    mediaUrl: ''
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await getGalleryImages();
      setItems(response.data);
    } catch (error) {
      toast.error('Failed to fetch gallery items');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'media') {
      setFormData({ ...formData, media: files[0], mediaUrl: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate
    if (inputMethod === 'url' && !formData.mediaUrl) {
      toast.error('Please enter a URL');
      return;
    }
    if (inputMethod === 'file' && !formData.media) {
      toast.error('Please select a file');
      return;
    }

    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    submitData.append('category', formData.category);
    submitData.append('mediaType', formData.mediaType);

    if (inputMethod === 'url') {
      submitData.append('mediaUrl', formData.mediaUrl);
    } else {
      submitData.append('media', formData.media);
    }

    try {
      if (editingItem) {
        await updateGalleryImage(editingItem._id, submitData);
        toast.success('Item updated successfully');
      } else {
        await createGalleryImage(submitData);
        toast.success('Item added successfully');
      }
      setShowModal(false);
      resetForm();
      fetchItems();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteGalleryImage(id);
        toast.success('Item deleted successfully');
        fetchItems();
      } catch (error) {
        toast.error('Failed to delete item');
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      category: item.category || 'general',
      mediaType: item.mediaType || 'image',
      media: null,
      mediaUrl: item.mediaUrl || ''
    });
    setInputMethod('url'); // Default to URL for editing
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'general',
      mediaType: 'image',
      media: null,
      mediaUrl: ''
    });
    setEditingItem(null);
    setInputMethod('file');
  };

 // Update the renderMediaPreview function in GalleryAdmin.jsx
const renderMediaPreview = (item) => {
  if (item.mediaType === 'video') {
    // Check if it's a YouTube/Vimeo URL
    const isYouTube = item.mediaUrl.includes('youtube.com') || item.mediaUrl.includes('youtu.be');
    const isVimeo = item.mediaUrl.includes('vimeo.com');
    
    if (isYouTube || isVimeo) {
      return (
        <div className="w-full h-48 bg-gray-900 relative">
          <iframe
            src={item.embedUrl || item.mediaUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={item.title}
          />
        </div>
      );
    } else {
      return (
        <video
          src={item.mediaUrl}
          className="w-full h-48 object-cover"
          controls
          preload="metadata"
        >
          <source src={item.mediaUrl} type="video/mp4" />
          <source src={item.mediaUrl} type="video/webm" />
          <source src={item.mediaUrl} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      );
    }
  } else {
    return (
      <img
        src={item.mediaUrl}
        alt={item.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
        }}
      />
    );
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add New Item
          </button>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {renderMediaPreview(item)}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    item.mediaType === 'video' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {item.mediaType}
                  </span>
                </div>
                {item.description && (
                  <p className="text-gray-600 mt-1">{item.description}</p>
                )}
                <div className="mt-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    {item.category}
                  </span>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="general">General</option>
                    <option value="events">Events</option>
                    <option value="campus">Campus</option>
                    <option value="students">Students</option>
                    <option value="videos">Videos</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Media Type
                  </label>
                  <select
                    name="mediaType"
                    value={formData.mediaType}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Input Method
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="file"
                        checked={inputMethod === 'file'}
                        onChange={() => setInputMethod('file')}
                        className="form-radio"
                      />
                      <span className="ml-2">Upload File</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="url"
                        checked={inputMethod === 'url'}
                        onChange={() => setInputMethod('url')}
                        className="form-radio"
                      />
                      <span className="ml-2">Enter URL</span>
                    </label>
                  </div>
                </div>

                {inputMethod === 'file' ? (
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      {formData.mediaType === 'video' ? 'Video File' : 'Image File'}
                    </label>
                    <input
                      type="file"
                      name="media"
                      onChange={handleChange}
                      accept={formData.mediaType === 'video' ? 'video/*' : 'image/*'}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                ) : (
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      {formData.mediaType === 'video' ? 'Video URL' : 'Image URL'}
                    </label>
                    <input
                      type="url"
                      name="mediaUrl"
                      value={formData.mediaUrl}
                      onChange={handleChange}
                      placeholder={formData.mediaType === 'video' 
                        ? 'https://youtube.com/... or https://vimeo.com/...' 
                        : 'https://example.com/image.jpg'}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formData.mediaType === 'video' && (
                      <p className="text-xs text-gray-500 mt-1">
                        Supports YouTube, Vimeo, and direct video URLs
                      </p>
                    )}
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    {editingItem ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryAdmin;