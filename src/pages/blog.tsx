import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

const Blog = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulated loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
   <Head>
  <title>Sober Tracker Blog - Tips for Sober Living & Recovery</title>
  <meta
    name="description"
    content="Get the latest tips and advice on sober living, recovery, and staying motivated during your sobriety journey. Read valuable insights from experts."
  />
  <meta
    name="keywords"
    content="sobriety blog, recovery tips, sober living, addiction recovery, motivation"
  />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>



      <div className="min-h-screen bg-gray-900 text-teal-200 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Sober Tracker Blog</h1>
        <p className="text-xl text-center text-white mb-8">
          Read the latest tips and stories on sober living and recovery.
        </p>

        {isLoading ? (
          // Skeleton loading effect
          <div className="space-y-8 max-w-4xl mx-auto">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="bg-gray-700 animate-pulse h-8 w-3/4 rounded-md mb-4"></div>
                <div className="bg-gray-700 animate-pulse h-6 w-full rounded-md mb-4"></div>
                <div className="bg-gray-700 animate-pulse h-4 w-1/2 rounded-md"></div>
              </div>
            ))}
          </div>
        ) : (
          // Blog Post List
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold mb-4 text-white">5 Tips for Staying Sober After Rehab</h2>
              <p className="text-lg mb-4 text-white">
                Maintaining sobriety after rehab is challenging. Here are five practical tips to help you stay on track and continue your recovery journey.
              </p>
              <Link href="/blogs/post-1" className="text-white hover:text-teal-300">
                Read More →
              </Link>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold mb-4 text-white">How to Build a Supportive Sober Community</h2>
              <p className="text-lg mb-4 text-white">
                Finding a community that supports your sobriety is essential. Learn how to find and build a strong network of people who understand your journey.
              </p>
              <Link href="/blogs/post-2" className="text-white hover:text-teal-300">
                Read More →
              </Link>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold mb-4 text-white">The Power of Daily Sober Motivation</h2>
              <p className="text-lg mb-4 text-white">
                Staying motivated every day is key to long-term sobriety. Discover how daily affirmations and positive thinking can keep you on track.
              </p>
              <Link href="/blogs/post-3" className="text-white hover:text-teal-300">
                Read More →
              </Link>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold mb-4 text-white">Understanding Triggers and How to Avoid Them</h2>
              <p className="text-lg mb-4 text-white">
                Triggers can cause cravings that make staying sober difficult. Learn how to identify and manage your triggers effectively.
              </p>
              <Link href="/blogs/post-4" className="text-white hover:text-teal-300">
                Read More →
              </Link>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold mb-4 text-white">Meditation and Mindfulness for Sobriety</h2>
              <p className="text-lg mb-4 text-white">
                Practicing mindfulness and meditation can strengthen your resolve in your sober journey. Discover techniques that work best for you.
              </p>
              <Link href="/blogs/post-5" className="text-white hover:text-teal-300">
                Read More →
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;

