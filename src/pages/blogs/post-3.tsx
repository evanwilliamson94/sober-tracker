import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';

const BlogPost3 = () => {
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
        <title>The Power of Daily Sober Motivation | Sober Tracker Blog</title>
        <meta
          name="description"
          content="Discover the power of daily sober motivation. Learn how affirmations, visual reminders, and reflection can help you stay committed to your sobriety journey."
        />
        <meta
          name="keywords"
          content="sober motivation, daily affirmations, sobriety journey, addiction recovery, staying motivated, sober living"
        />

        {/* Open Graph meta tags */}
        <meta property="og:title" content="The Power of Daily Sober Motivation" />
        <meta property="og:description" content="Learn how daily affirmations, visual reminders, and reflection can support your long-term sobriety and keep you motivated." />
        <meta property="og:image" content="/daily-sober-motivation.png" />
        <meta property="og:url" content="https://sober-tracker.vercel.app/blogs/post-3" />
        <meta property="og:type" content="article" />

        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Power of Daily Sober Motivation" />
        <meta name="twitter:description" content="Learn how to incorporate daily motivation into your sobriety journey to stay strong and focused." />
        <meta name="twitter:image" content="/daily-sober-motivation.png" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white p-6">
        {isLoading ? (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-gray-800 animate-pulse h-10 w-3/4 rounded-md mb-4"></div>
            <div className="bg-gray-800 animate-pulse h-64 w-full rounded-md mb-4"></div>
            <div className="bg-gray-800 animate-pulse h-6 w-full rounded-md mb-4"></div>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-6 text-center">
              The Power of Daily Sober Motivation
            </h1>

            <Image
              src="/daily-sober-motivation.png"
              alt="Person reflecting with a motivational quote to stay focused on their sober journey."
              width={800}
              height={400}
              className="rounded-lg mx-auto mb-6"
            />

            <p className="text-lg mb-4">
              Staying motivated every day is one of the keys to long-term sobriety. Daily motivation gives you the strength to push through difficult moments and stay focused on your recovery goals. Whether you&apos;re starting your sobriety journey or have been on this path for years, incorporating sober motivation into your daily routine can make all the difference. Here&apos;s how you can create a daily routine that keeps you inspired and motivated.
            </p>

            <section>
              <h2 className="text-3xl font-semibold mb-4">1. Start Your Day with Affirmations</h2>
              <p className="text-lg mb-4">
                Morning affirmations set a positive tone for the rest of the day. Simple phrases like “I am in control” or “I am stronger than my addiction” can shift your mindset and remind you of your inner strength. Affirmations help reinforce your commitment to staying sober and give you the courage to face challenges head-on.
              </p>
              <p className="text-lg mb-4">
                You can even personalize your affirmations to address specific challenges you&apos;re facing, like &quot;Today, I choose to stay strong&quot; or &quot;I am building a better future for myself every day.&quot; Repeating these phrases in front of a mirror or writing them down first thing in the morning can make them more impactful.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">2. Use Visual Reminders Throughout the Day</h2>
              <p className="text-lg mb-4">
                Visual reminders keep you grounded and focused on your sobriety throughout the day. Whether it&apos;s a sticky note on your mirror, a framed quote on your desk, or a motivational wallpaper on your phone, these reminders can serve as powerful motivators.
              </p>
              <p className="text-lg mb-4">
                Try placing these visual cues in areas where you spend the most time, like your workspace, kitchen, or bedroom. You could even carry a small motivational card in your wallet or set up recurring notifications on your phone with encouraging messages. These small but consistent reminders help reinforce your commitment and provide inspiration when you need it most.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">3. Reflect on Your Progress</h2>
              <p className="text-lg mb-4">
                Reflection is a powerful tool for maintaining sobriety. Take time each day to reflect on how far you&apos;ve come in your journey. Celebrate your victories—no matter how small—and remind yourself of the obstacles you&apos;ve overcome. This reflection can be done through journaling, meditating, or even having a quiet moment of gratitude.
              </p>
              <p className="text-lg mb-4">
                Reflection not only helps you acknowledge the progress you&apos;ve made but also keeps you focused on your long-term goals. By regularly looking back on your accomplishments, you reinforce your belief in your ability to stay sober, even when faced with challenges.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">4. Share Your Journey with Others</h2>
              <p className="text-lg mb-4">
                Sharing your sobriety journey can provide motivation for both you and others. Whether it&apos;s through a journal, social media, or a support group, opening up about your experiences can give you a sense of accomplishment and accountability. Sharing your story not only keeps you motivated, but it can also inspire others to begin or stay committed to their own sobriety journey.
              </p>
              <p className="text-lg mb-4">
                Engaging with online sober communities, like Facebook groups or Reddit threads, allows you to connect with others who understand your struggles. Supporting others on their journey can also reinforce your own motivation and remind you of the importance of staying sober.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">5. Stay Physically Active and Healthy</h2>
              <p className="text-lg mb-4">
                Staying physically active is an excellent way to boost your mood and motivation. Regular exercise releases endorphins, the body’s natural “feel-good” chemicals, which can help combat stress and anxiety. Whether it&apos;s walking, running, yoga, or any other physical activity you enjoy, staying active can provide a natural energy boost and keep you feeling positive about your progress.
              </p>
              <p className="text-lg mb-4">
                In addition to physical activity, maintaining a healthy diet can also enhance your mood and energy levels. Eating well-balanced meals, staying hydrated, and getting enough sleep all contribute to your overall well-being and help you stay focused on your sobriety journey.
              </p>
            </section>

            <p className="text-lg mb-4">
              By incorporating daily motivation into your life, you can stay strong and focused on your recovery, one day at a time. Remember that every small step forward is a victory, and with the right mindset and support, you can continue to build a life of sobriety and fulfillment.
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default BlogPost3;

