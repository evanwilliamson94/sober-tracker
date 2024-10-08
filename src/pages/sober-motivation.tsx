import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';

const SoberMotivation: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuote, setCurrentQuote] = useState<string>('');

  // Memoized list of quotes
  const quotes = useMemo(
    () => [
      'The journey of sobriety is the first step to freedom.',
      'Every sober day is a victory.',
      'Strength doesn\'t come from what you can do, it comes from overcoming the things you thought you couldn\'t.',
      'You\'re stronger than any obstacle in your path to recovery.',
      'One day at a time, you\'re becoming the best version of yourself.',
    ],
    []
  );

  // Simulate loading and choose a random quote
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }, 1500); // Simulated loading time

    return () => clearTimeout(timer);
  }, [quotes]);

  return (
    <>
      <Head>
        <title>Sober Motivation - Daily Inspirational Quotes for Sobriety</title>
        <meta
          name="description"
          content="Stay motivated on your sobriety journey with personalized daily quotes and affirmations. Get your sober motivation tailored to your goals."
        />
        <meta
          name="keywords"
          content="sober motivation, daily quotes, sobriety affirmations, recovery motivation"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
        {isLoading ? (
          // Skeleton Loading State
          <div className="flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto">
            <div className="bg-gray-700 animate-pulse h-8 w-3/4 rounded-md"></div>
            <div className="bg-gray-700 animate-pulse h-6 w-1/2 rounded-md"></div>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 transition-all">
              Sober Motivation
            </h1>
            <p className="text-2xl sm:text-3xl font-light mb-4">
              &quot;{currentQuote}, John!&quot;
            </p>
            <span className="block mt-4 text-white italic">- Anonymous</span>
            <button
              onClick={() => {
                const randomIndex = Math.floor(Math.random() * quotes.length);
                setCurrentQuote(quotes[randomIndex]);
              }}
              className="mt-8 px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white rounded-lg shadow-lg transition-all transform hover:scale-105"
            >
              Get a New Quote
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SoberMotivation;
