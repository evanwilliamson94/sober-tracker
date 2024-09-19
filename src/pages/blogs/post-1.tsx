import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';

const BlogPost1 = () => {
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
        <title>5 Tips for Staying Sober After Rehab | Sober Tracker Blog</title>
        <meta
          name="description"
          content="Learn essential tips for staying sober after rehab. Build a support system, develop new habits, stay connected with therapy, and avoid triggers."
        />
        <meta
          name="keywords"
          content="sober living, rehab, addiction recovery, support system, staying sober, triggers, therapy"
        />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white p-6">
        {isLoading ? (
          // Skeleton loading effect
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-gray-800 animate-pulse h-10 w-3/4 rounded-md mb-4"></div> {/* Simulate title */}
            <div className="bg-gray-800 animate-pulse h-64 w-full rounded-md mb-4"></div> {/* Simulate image */}
            <div className="bg-gray-800 animate-pulse h-6 w-full rounded-md mb-4"></div> {/* Simulate paragraph */}
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-6 text-center">
              5 Tips for Staying Sober After Rehab
            </h1>

            <Image
              src="/sober-living-after-rehab.png"
              alt="Person practicing mindfulness in a peaceful environment to maintain sobriety after rehab."
              width={800}
              height={400}
              className="rounded-lg mx-auto mb-6"
            />

            <p className="text-lg mb-4">
              Maintaining sobriety after leaving rehab is challenging, but with the
              right tools and strategies, you can stay on track. Here are five
              practical tips to help you continue your recovery journey.
            </p>

            <section>
              <h2 className="text-3xl font-semibold mb-4">1. Build a Support System</h2>
              <p className="text-lg mb-4">
                Surround yourself with people who support your sobriety. Whether it’s
                friends, family, or a support group, having a strong network of
                positive influences is crucial for long-term recovery.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">2. Develop New Habits</h2>
              <p className="text-lg mb-4">
                Replace old habits with new, healthy ones. Engage in activities that
                help you grow, such as exercise, meditation, or learning a new hobby,
                to keep your mind and body busy.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">3. Stay Connected with Therapy</h2>
              <p className="text-lg mb-4">
                Continuing therapy after rehab is vital for addressing underlying
                issues that contributed to addiction. Therapists can help you work
                through emotional challenges and provide tools to maintain sobriety.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">4. Avoid Triggers</h2>
              <p className="text-lg mb-4">
                Identify the people, places, and situations that may tempt you to
                relapse and avoid them as much as possible. Create a plan for how to
                handle cravings when they arise.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">5. Take it One Day at a Time</h2>
              <p className="text-lg mb-4">
                Recovery is a journey. Focus on staying sober today rather than
                worrying about the future. Celebrate each day of sobriety as a
                victory.
              </p>
            </section>

            <p className="text-lg mb-4">
              By following these tips and staying committed to your recovery, you can
              build a healthy, sober life after rehab.
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default BlogPost1;
