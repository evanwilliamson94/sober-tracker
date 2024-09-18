import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url(/Sober-tracker-background2.png)' }}
      >
        <div className="bg-black bg-opacity-20 absolute inset-0"></div>
        
        <div className="relative z-10 text-center text-white p-6 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Take Control of Your Journey</h1>
          <p className="text-lg md:text-xl mb-8">
            Start tracking your sobriety, gain support, and stay motivated with daily affirmations tailored to your journey.
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
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Why Choose Sober Tracker?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-bold text-indigo-600">Daily Motivation</h3>
              <p className="mt-4 text-gray-600">Get daily affirmations and motivational quotes tailored to your sobriety journey.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-bold text-indigo-600">Track Your Progress</h3>
              <p className="mt-4 text-gray-600">Stay on top of your progress with personalized tracking and goal-setting features.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-bold text-indigo-600">Community Support</h3>
              <p className="mt-4 text-gray-600">Join a community of like-minded individuals committed to their journey of sobriety.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
