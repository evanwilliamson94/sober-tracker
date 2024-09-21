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

  // Google Analytics tracking
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
        <title>Stay Sober Tracker - Track Your Sobriety Journey</title>
        <meta
          name="description"
          content="Stay Sober Tracker helps you stay motivated on your sobriety journey with personalized tracking, community support, and daily affirmations."
        />
        <meta
          name="keywords"
          content="sobriety tracker, sober support, addiction recovery, daily motivation, sobriety community"
        />
        {/* Open Graph meta tags for social media sharing */}
        <meta property="og:title" content="Stay Sober Tracker - Track Your Sobriety Journey" />
        <meta property="og:description" content="Join the journey to sobriety with our personalized tracker, community support, and daily affirmations tailored to your goals." />
        <meta property="og:image" content="/Sober-tracker-background2.png" />
        <meta property="og:url" content="https://sober-tracker.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stay Sober Tracker" />
        <meta name="twitter:description" content="Track your sobriety journey and stay motivated with daily affirmations and community support." />
        <meta name="twitter:image" content="/Sober-tracker-background2.png" />
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

      {/* Hero Section */}
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
            Take Control of Your Sobriety Journey
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Track your progress, receive support, and stay motivated with daily affirmations designed for your recovery.
          </p>
          <Link href="/tracker">
  <span className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-lg font-semibold transition duration-300">
    Start Tracking Now
  </span>
</Link>

        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
  <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
      Why Choose Sober Tracker?
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-indigo-600">Daily Motivation</h3>
        <p className="mt-4 text-gray-600">
          Receive daily affirmations and motivational quotes personalized to your sobriety journey.
        </p>
      </div>
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-indigo-600">Track Your Progress</h3>
        <p className="mt-4 text-gray-600">
          Stay on top of your recovery milestones with personalized tracking tools and goal-setting features.
        </p>
      </div>
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-indigo-600">Community Support</h3>
        <p className="mt-4 text-gray-600">
          Join a community of individuals dedicated to their sobriety journey and support each other.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Subscription Features Section */}
   
      <section className="py-16 bg-white text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-indigo-600">
          Get More with Premium
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-8">
          Access exclusive features, track longer milestones, and receive custom sobriety rewards with our premium subscription.
        </p>

        {/* Pricing Plans */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-10">
          {/* Free Plan */}
          <div className="bg-gray-100 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-xs md:max-w-sm">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Free Plan</h3>
            <ul className="list-disc text-left text-gray-700 space-y-2 ml-4">
              <li>Track your sobriety journey</li>
              <li>Daily affirmations</li>
              <li>Community access</li>
            </ul>
          </div>

          {/* Premium Plan */}
          <div className="bg-indigo-600 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-xs md:max-w-sm text-white">
            <h3 className="text-2xl font-bold mb-4">Premium Plan</h3>
            <ul className="list-disc text-left space-y-2 ml-4">
              <li>All free plan features</li>
              <li>Advanced tracking tools</li>
              <li>Custom sobriety milestones</li>
              <li>Exclusive rewards & badges</li>
              <li>Priority support</li>
            </ul>
          </div>
        </div>
      </div>
    </section>





      {/* Call to Action: Join the Community */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Join the Sober Journey</h2>
          <p className="text-lg mb-8">
            Whether you&apos;re beginning or maintaining your sobriety journey, Sober Tracker offers the tools and community to support your recovery. 
            Stay motivated, track your progress, and connect with others on a similar path.
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
