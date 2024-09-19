import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';

const BlogPost2 = () => {
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
        <title>How to Build a Supportive Sober Community | Sober Tracker Blog</title>
        <meta
          name="description"
          content="Learn how to build a supportive sober community. Find local and online support groups, connect with sober friends, and stay on track with your sobriety journey."
        />
        <meta
          name="keywords"
          content="supportive sober community, addiction recovery, sober friends, AA meetings, online support groups"
        />

        {/* Open Graph meta tags */}
        <meta property="og:title" content="How to Build a Supportive Sober Community" />
        <meta property="og:description" content="Discover how to build a strong sober community through support groups, online communities, and connecting with sober friends." />
        <meta property="og:image" content="/sobriety-support-group.png" />
        <meta property="og:url" content="https://sober-tracker.vercel.app/blogs/post-2" />
        <meta property="og:type" content="article" />

        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How to Build a Supportive Sober Community" />
        <meta name="twitter:description" content="Learn how to create a supportive sober community with tips on support groups, sober friends, and online communities." />
        <meta name="twitter:image" content="/sobriety-support-group.png" />
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
              How to Build a Supportive Sober Community
            </h1>

            <Image
              src="/sobriety-support-group.png"
              alt="Group of people in a support group sharing stories and supporting each other."
              width={800}
              height={400}
              className="rounded-lg mx-auto mb-6"
            />

            <p className="text-lg mb-4">
              Building a sober community is one of the most powerful tools for staying sober. It offers accountability, support, and a sense of belonging. Whether you&apos;re newly sober or have been on this journey for a while, having a network that understands your struggles and celebrates your progress is crucial. Here&apos;s how to create a strong network that will help you stay on track.
            </p>

            <section>
              <h2 className="text-3xl font-semibold mb-4">1. Join a Local Support Group</h2>
              <p className="text-lg mb-4">
                Finding a local support group like AA (Alcoholics Anonymous) or NA (Narcotics Anonymous) can help you meet others who are going through similar experiences. Regular meetings provide a space to share stories, challenges, and successes. Groups like these are often run by people who have been through addiction and have found strength in the community.
              </p>
              <p className="text-lg mb-4">
                Attending these meetings consistently not only helps keep you accountable but also allows you to create deeper connections with people who can offer ongoing encouragement. Many individuals find their sober community becomes a second family.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">2. Use Online Communities for Additional Support</h2>
              <p className="text-lg mb-4">
                In addition to local meetings, there are numerous online communities that offer the flexibility of connecting with others from home. Platforms like Facebook groups, Reddit&apos;s r/StopDrinking, and dedicated apps like Sober Grid and I Am Sober are excellent places to interact with people who are also focusing on sobriety.
              </p>
              <p className="text-lg mb-4">
                These online spaces provide 24/7 access to support, advice, and camaraderie from all over the world. You can engage in discussions, ask for help during moments of weakness, and celebrate victories together. Many people find that the anonymity of online groups allows them to open up more freely.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">3. Connect with Sober Friends</h2>
              <p className="text-lg mb-4">
                Building and maintaining friendships with other sober individuals can be a key aspect of long-term recovery. Whether these are friends you&apos;ve met through support groups, online communities, or those who have been in your life for a while, having sober friends gives you a network of people who genuinely understand your journey.
              </p>
              <p className="text-lg mb-4">
                Sober friends can offer a safe and understanding space where you can discuss cravings, share positive moments, and even participate in activities that don&apos;t revolve around alcohol or drugs. This helps reinforce your commitment to sobriety and encourages healthier lifestyle choices.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">4. Volunteer or Mentor Others</h2>
              <p className="text-lg mb-4">
                One of the best ways to stay committed to your sobriety journey is to help others who are just beginning theirs. Many support groups and organizations welcome volunteers who can share their experiences and offer guidance. Not only does this give back to the community, but it also strengthens your own resolve.
              </p>
              <p className="text-lg mb-4">
                Being a mentor for someone new to sobriety can be incredibly rewarding. By encouraging others, you reaffirm your own commitment and build meaningful relationships with those who look up to you for advice and support.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">5. Engage in Sober Activities and Events</h2>
              <p className="text-lg mb-4">
                Staying social and engaged in your community is important, but so is making sure you do so in environments where sobriety is celebrated. Many cities have sober events, activities, and groups that focus on entertainment, fitness, and socializing without the presence of alcohol or substances.
              </p>
              <p className="text-lg mb-4">
                From sober dance parties to hiking clubs, there are plenty of ways to stay active and have fun while reinforcing your sober lifestyle. These events also provide another avenue to meet new friends and expand your sober community.
              </p>
            </section>

            <p className="text-lg mb-4">
              By building a community of support, you reinforce your commitment to sobriety and share your experiences with others who are on the same path. With the right people around you, staying sober becomes a shared effort and an achievable goal.
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default BlogPost2;
