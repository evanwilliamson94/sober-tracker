import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image'; // Import next/image

const Community = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay for skeleton loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Temporary state for mock data (photos, likes, and comments)
  const [photos, setPhotos] = useState([
    {
      id: 1,
      url: '/placeholder-image-1.jpg',
      likes: 10,
      comments: ['Great photo!', 'Keep up the good work!'],
    },
    {
      id: 2,
      url: '/placeholder-image-2.jpg',
      likes: 5,
      comments: ['Inspirational!', 'Thanks for sharing!'],
    },
  ]);

  // Featured photo (can be updated dynamically later)
  const featuredPhoto = {
    id: 'featured',
    url: '/featured-image.jpg',
    contributor: 'Top Contributor',
  };

  // Placeholder functions for likes and comments (can connect to Firebase later)
  const handleLike = (photoId: number) => {
    setPhotos(photos.map(photo => (photo.id === photoId ? { ...photo, likes: photo.likes + 1 } : photo)));
  };

  const handleComment = (photoId: number, comment: string) => {
    setPhotos(photos.map(photo => (photo.id === photoId ? { ...photo, comments: [...photo.comments, comment] } : photo)));
  };

  return (
    <>
    <Head>
  <title>Join the Sober Tracker Community - Share Your Sobriety Journey</title>
  <meta
    name="description"
    content="Connect with others in the Sober Tracker community, share your sobriety journey, and get support from like-minded individuals."
  />
  <meta
    name="keywords"
    content="sobriety community, sober living, addiction recovery, share your journey, sobriety support"
  />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>


      <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Community</h1>
        <p className="text-xl text-center mb-8">Share your journey, inspire others, and connect with the sober community.</p>

        {/* Featured Section */}
        {isLoading ? (
          <div className="bg-gray-800 animate-pulse p-6 rounded-lg shadow-lg max-w-lg mx-auto mb-12">
            <div className="bg-gray-700 h-64 rounded-lg mb-4"></div> {/* Skeleton for featured image */}
            <div className="bg-gray-700 h-6 w-1/2 rounded-md mx-auto"></div> {/* Skeleton for featured text */}
          </div>
        ) : (
          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-center">Featured Photo</h2>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
              <Image src={featuredPhoto.url} alt="Featured photo by Top Contributor" width={800} height={600} className="w-full h-auto mb-4 rounded-lg" />
              <p className="text-lg text-center">Featured Contributor: {featuredPhoto.contributor}</p>
            </div>
          </div>
        )}

        {/* Photo Upload Section (Placeholder) */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-6">Upload Your Photo</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
            <input type="file" className="text-teal-200" />
            <button className="mt-4 px-6 py-2 bg-teal-500 hover:bg-teal-400 text-white rounded-lg shadow-lg transition-all">
              Upload Photo
            </button>
          </div>
        </div>

        {/* Photo Feed Section */}
        {isLoading ? (
          <div className="space-y-8 max-w-4xl mx-auto">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="bg-gray-700 h-64 rounded-lg mb-4"></div> {/* Skeleton for image */}
                <div className="bg-gray-700 h-6 w-1/3 rounded-md mb-4"></div> {/* Skeleton for like button */}
                <div className="bg-gray-700 h-4 w-full rounded-md"></div> {/* Skeleton for comments */}
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {photos.map(photo => (
              <div key={photo.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <Image src={photo.url} alt={`User uploaded photo with ID ${photo.id}`} width={800} height={600} className="w-full h-auto mb-4 rounded-lg" />
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={() => handleLike(photo.id)}
                    className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-white rounded-lg"
                  >
                    Like ({photo.likes})
                  </button>
                </div>

                {/* Comments Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Comments</h3>
                  {photo.comments.map((comment, index) => (
                    <p key={index} className="text-teal-200 mb-2">- {comment}</p>
                  ))}

                  {/* Add Comment Input (Placeholder for future functionality) */}
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Add a comment"
                      className="w-full p-2 bg-gray-700 text-teal-200 rounded-md mb-2"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          handleComment(photo.id, e.currentTarget.value);
                          e.currentTarget.value = ''; // Clear input after submitting
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Community;
