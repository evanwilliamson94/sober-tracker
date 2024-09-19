/* eslint-disable react/no-unescaped-entities */

import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';

const SoberMotivation = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Wrap 'quotes' in useMemo to prevent re-initializing on every render
  const quotes = useMemo(() => [
    'The journey of sobriety is the first step to freedom.',
    'Every sober day is a victory.',
    'Strength doesn&apos;t come from what you can do, it comes from overcoming the things you thought you couldn&apos;t.',
    'You&apos;re stronger than any obstacle in your path to recovery.',
    'One day at a time, you&apos;re becoming the best version of yourself.',
  ], []);

  const [currentQuote, setCurrentQuote] = useState('');

  // Simulate loading delay and pick a random quote
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }, 1500); // Simulate loading time

    return () => clearTimeout(timer);
  }, [quotes]); // Added 'quotes' as a dependency

  return (
    <>
      <Head>
        <title>Sober Motivation - Daily Inspirational Quotes</title>
        <meta
          name="description"
          content="Receive daily personalized motivational quotes for your sobriety journey. Stay inspired and focused every day with Sober Tracker."
        />
        <meta
          name="keywords"
          content="sobriety motivation, sober quotes, daily sobriety inspiration, addiction recovery motivation, sobriety support"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
        {isLoading ? (
          // Skeleton loading state
          <div className="flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto">
            <div className="bg-gray-700 animate-pulse h-8 w-3/4 rounded-md"></div>
            <div className="bg-gray-700 animate-pulse h-6 w-1/2 rounded-md"></div>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Sober Motivation</h1>
            <p className="text-2xl mb-4">&quot;{currentQuote}, John!&quot;</p>
            <span className="block mt-4 text-white italic">- Anonymous</span>
            <button
              onClick={() => {
                const randomIndex = Math.floor(Math.random() * quotes.length);
                setCurrentQuote(quotes[randomIndex]);
              }}
              className="mt-8 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white rounded-lg shadow-lg transition-all"
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
