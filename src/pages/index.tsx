import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';

// Extend the window object to include gtag in TypeScript
declare global {
  interface Window {
    gtag?: (...args: [string, string, Record<string, unknown>?]) => void;
  }
}


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate image load time (1.5 seconds)
    return () => clearTimeout(timer);
  }, []);

  // Add Google Analytics for production environment
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const handleRouteChange = (url: string) => {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('config', 'G-366GM77WMG', {
            page_path: url,
          });
        }
      };

      handleRouteChange(window.location.pathname); // Track initial page load
    }
  }, []);

  return (
    <>
      <Head>
        <title>Stay Sober Tracker - Take Control of Your Sobriety Journey</title>
        <meta
          name="description"
          content="Stay Sober Tracker helps you take control of your sobriety journey by offering personalized tracking, daily motivation, and community support."
        />
        <meta name="keywords" content="sobriety tracker, sober living, addiction recovery, daily motivation, sobriety support, sober community" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Google Analytics Script */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-366GM77WMG"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-366GM77WMG', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <div className="relative h-screen flex items-center justify-center bg-cover bg-center">
        {isLoading ? (
          // Skeleton loading effect with flex column layout
          <div className="flex flex-col items-center justify-center w-full h-full space-y-6">
            <div className="bg-gray-300 animate-pulse w-3/4 h-12 rounded-md"></div> {/* Simulate title */}
            <div className="bg-gray-300 animate-pulse w-1/2 h-6 rounded-md"></div> {/* Simulate description */}
            <div className="bg-gray-300 animate-pulse w-1/4 h-10 rounded-md"></div> {/* Simulate button */}
          </div>
        ) : (
          <>
            <Image
              src="/Sober-tracker-background2.png"
              alt="Sober Tracker Background"
              layout="fill"
              objectFit="cover"
              onLoadingComplete={() => setIsLoading(false)}
            />
            <div className="bg-black bg-opacity-20 absolute inset-0"></div>
          </>
        )}

        <div className="relative z-10 text-center text-white p-6 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Take Control of Your Journey
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Start tracking your sobriety, gain support, and stay motivated with
            daily affirmations tailored to your journey.
          </p>
          <Link href="/tracker" passHref>
            <span className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-lg font-semibold transition duration-300">
              Start Tracking Now
            </span>
          </Link>
        </div>
      </div>

      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center px-4 md:px-0">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Why Choose Sober Tracker?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-bold text-indigo-600">
                Daily Motivation
              </h3>
              <p className="mt-4 text-gray-600">
                Get daily affirmations and motivational quotes tailored to your
                sobriety journey.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-bold text-indigo-600">
                Track Your Progress
              </h3>
              <p className="mt-4 text-gray-600">
                Stay on top of your progress with personalized tracking and
                goal-setting features.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-bold text-indigo-600">
                Community Support
              </h3>
              <p className="mt-4 text-gray-600">
                Join a community of like-minded individuals committed to their
                journey of sobriety.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Join the Sober Journey</h2>
          <p className="text-lg mb-8">
            Whether you&apos;re starting your sobriety journey or maintaining it,
            Sober Tracker provides the tools and support you need to succeed.
            Connect with others, stay motivated, and track your progress every
            step of the way.
          </p>
          <Link href="/community" passHref>
            <span className="inline-block bg-teal-500 hover:bg-teal-600 text-white py-3 px-8 rounded-lg font-semibold transition duration-300">
              Join the Community
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
