import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getGalleryImages } from '../api';
import ReactPlayer from 'react-player';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mediaType, setMediaType] = useState('all');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await getGalleryImages();
      
      // Handle different response formats
      let galleryItems = [];
      
      if (response && response.data) {
        // If response.data is an array
        if (Array.isArray(response.data)) {
          galleryItems = response.data;
        }
        // If response.data is an object with items/data property
        else if (response.data.items && Array.isArray(response.data.items)) {
          galleryItems = response.data.items;
        }
        else if (response.data.galleryItems && Array.isArray(response.data.galleryItems)) {
          galleryItems = response.data.galleryItems;
        }
        // If response.data is an object but not array, try to get values
        else if (typeof response.data === 'object' && response.data !== null) {
          // Check if it has numeric keys (like an object that should be array)
          const possibleArrays = Object.values(response.data).filter(val => Array.isArray(val));
          if (possibleArrays.length > 0) {
            galleryItems = possibleArrays[0];
          } else {
            console.warn('Response data is an object but no array found:', response.data);
            galleryItems = [];
          }
        }
      } 
      // If response itself is an array
      else if (Array.isArray(response)) {
        galleryItems = response;
      }
      // If response is an object with items
      else if (response && response.items && Array.isArray(response.items)) {
        galleryItems = response.items;
      }
      // If response is null or undefined
      else if (!response) {
        console.warn('No response received from API');
        galleryItems = [];
      }
      
      // Ensure galleryItems is always an array
      if (!Array.isArray(galleryItems)) {
        console.error('galleryItems is not an array:', galleryItems);
        galleryItems = [];
      }
      
      setItems(galleryItems);
      
      // Extract unique categories (only if items array is not empty)
      if (galleryItems.length > 0) {
        const uniqueCategories = ['all', ...new Set(galleryItems.map(item => item.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } else {
        setCategories(['all']);
      }
      
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      toast.error('Failed to load gallery items. Please try again later.');
      setItems([]); // Set empty array on error
      setCategories(['all']);
    } finally {
      setLoading(false);
    }
  };

  // Safely filter items - ensure items is an array
  const filteredItems = Array.isArray(items) ? items.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const typeMatch = mediaType === 'all' || item.mediaType === mediaType;
    return categoryMatch && typeMatch;
  }) : [];

  const renderMediaCard = (item) => {
    if (!item) return null;
    
    if (item.mediaType === 'video') {
      return (
        <div 
          className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg h-64"
          onClick={() => setSelectedItem(item)}
        >
          <div className="w-full h-full bg-gray-900 relative">
            {item.thumbnailUrl ? (
              <img
                src={item.thumbnailUrl}
                alt={item.title || 'Video thumbnail'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x300?text=Video+Thumbnail';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  <path d="M8 8v6l5-3-5-3z" />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 4v12l10-6L6 4z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 text-white">
              <h3 className="text-lg font-semibold">{item.title || 'Untitled'}</h3>
              {item.description && (
                <p className="text-sm">{item.description}</p>
              )}
            </div>
          </div>
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            Video
          </span>
        </div>
      );
    } else {
      return (
        <div
          className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg h-64"
          onClick={() => setSelectedItem(item)}
        >
          <img
            src={item.mediaUrl || 'https://via.placeholder.com/400x300?text=Image+Not+Found'}
            alt={item.title || 'Gallery image'}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 text-white">
              <h3 className="text-lg font-semibold">{item.title || 'Untitled'}</h3>
              {item.description && (
                <p className="text-sm">{item.description}</p>
              )}
            </div>
          </div>
        </div>
      );
    }
  };

  const renderVideoPlayer = (item) => {
    if (!item) return null;
    
    // Use embedUrl if available, otherwise use mediaUrl
    const videoUrl = item.embedUrl || item.mediaUrl;
    
    if (!videoUrl) {
      return (
        <div className="relative pt-[56.25%] bg-gray-800 flex items-center justify-center">
          <p className="text-white">Video URL not available</p>
        </div>
      );
    }
    
    // Check if it's a YouTube/Vimeo URL or direct video
    const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
    const isVimeo = videoUrl.includes('vimeo.com');
    const isDirectVideo = videoUrl.match(/\.(mp4|webm|ogg|mov|avi|mkv)(\?.*)?$/i);
    
    if (isYouTube || isVimeo) {
      // For YouTube and Vimeo, use iframe
      return (
        <div className="relative pt-[56.25%]">
          <iframe
            src={videoUrl}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={item.title || 'Video'}
          />
        </div>
      );
    } else if (isDirectVideo) {
      // For direct video files, use video element with proper MIME types
      return (
        <div className="relative pt-[56.25%]">
          <video
            className="absolute top-0 left-0 w-full h-full"
            controls
            preload="metadata"
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/webm" />
            <source src={videoUrl} type="video/ogg" />
            <source src={videoUrl} type="video/quicktime" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else {
      // Fallback to ReactPlayer for other cases
      return (
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            className="absolute top-0 left-0"
            controls
            playing
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload'
                }
              }
            }}
          />
        </div>
      );
    }
  };

  const renderModalContent = () => {
    if (!selectedItem) return null;

    if (selectedItem.mediaType === 'video') {
      return (
        <div className="relative max-w-4xl w-full bg-black rounded-lg overflow-hidden">
          {renderVideoPlayer(selectedItem)}
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
          >
            &times;
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="text-2xl font-bold text-white">{selectedItem.title || 'Untitled'}</h3>
            {selectedItem.description && (
              <p className="text-lg text-white">{selectedItem.description}</p>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="relative max-w-4xl max-h-full">
          <img
            src={selectedItem.mediaUrl || 'https://via.placeholder.com/800x600?text=Image+Not+Found'}
            alt={selectedItem.title || 'Gallery image'}
            className="max-w-full max-h-[90vh] object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
            }}
          />
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
          >
            &times;
          </button>
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-2xl font-bold">{selectedItem.title || 'Untitled'}</h3>
            {selectedItem.description && (
              <p className="text-lg">{selectedItem.description}</p>
            )}
          </div>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h1>
          <p className="text-xl text-gray-600">Explore our campus life, events, and videos</p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          {/* Category Filter */}
          {categories.length > 1 && (
            <div className="flex justify-center mb-4 space-x-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full capitalize mb-2 ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Media Type Filter */}
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => setMediaType('all')}
              className={`px-4 py-2 rounded-full ${
                mediaType === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setMediaType('image')}
              className={`px-4 py-2 rounded-full ${
                mediaType === 'image'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Images
            </button>
            <button
              onClick={() => setMediaType('video')}
              className={`px-4 py-2 rounded-full ${
                mediaType === 'video'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Videos
            </button>
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No items found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div key={item._id || index}>
                {renderMediaCard(item)}
              </div>
            ))}
          </div>
        )}

        {/* Lightbox/Video Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedItem(null);
              }
            }}
          >
            {renderModalContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;