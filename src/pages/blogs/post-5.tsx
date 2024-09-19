import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';

const BlogPost5 = () => {
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
        <title>Meditation and Mindfulness for Sobriety | Sober Tracker Blog</title>
        <meta
          name="description"
          content="Learn how meditation and mindfulness can help maintain sobriety by reducing stress, managing cravings, and supporting long-term recovery."
        />
        <meta
          name="keywords"
          content="sobriety, meditation, mindfulness, addiction recovery, mental health, sober living, meditation techniques"
        />
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
              Meditation and Mindfulness for Sobriety
            </h1>

            <Image
              src="/meditation-sobriety.png"
              alt="Person practicing mindfulness and meditation to support sobriety."
              width={800}
              height={400}
              className="rounded-lg mx-auto mb-6"
            />

            <p className="text-lg mb-4">
              Meditation and mindfulness are powerful tools that can support long-term sobriety by helping you manage cravings, reduce stress, and stay committed to your recovery journey. These practices enable you to stay present, focused, and in control of your emotions, making it easier to avoid relapse. Here’s how these practices can aid in your recovery.
            </p>

            <section>
              <h2 className="text-3xl font-semibold mb-4">1. The Benefits of Mindfulness</h2>
              <p className="text-lg mb-4">
                Mindfulness is the practice of staying fully present in the moment, without judgment. For individuals in recovery, mindfulness can be an essential tool for managing cravings, staying aware of emotional triggers, and avoiding relapse. By focusing on the present, you can learn to observe your thoughts and emotions without letting them control your actions.
              </p>
              <p className="text-lg mb-4">
                Practicing mindfulness helps you respond to stressful situations with clarity and calm, rather than reacting impulsively. It allows you to break the cycle of automatic responses that may have led to substance use in the past.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">2. How Meditation Supports Sobriety</h2>
              <p className="text-lg mb-4">
                Meditation is a mental exercise that helps you build focus, clarity, and inner calm. For those in recovery, it can be a way to manage stress, anxiety, and the emotional challenges that often arise. Regular meditation can strengthen your mental resilience, making it easier to handle difficult moments without turning to substances.
              </p>
              <p className="text-lg mb-4">
                Through meditation, you can develop a greater awareness of your thoughts and emotions, allowing you to gain control over how you respond to cravings or high-stress situations. Meditation offers a safe space where you can process emotions in a healthy, non-reactive way.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">3. Simple Meditation Techniques to Try</h2>
              <p className="text-lg mb-4">
                If you’re new to meditation, start with simple techniques that focus on breathing or guided meditation. Try these techniques to get started:
              </p>
              <ul className="list-disc list-inside mb-4">
                <li className="mb-2">**Deep Breathing**: Sit comfortably and take slow, deep breaths. Focus on the sensation of your breath entering and leaving your body. This simple exercise can calm your mind and reduce stress.</li>
                <li className="mb-2">**Body Scan Meditation**: Lie down and focus on different parts of your body, starting from your feet and working up to your head. Notice any tension or discomfort and consciously relax those areas.</li>
                <li>**Guided Meditation**: Use a meditation app or online video to guide you through a meditation session. Guided meditations are great for beginners who may find it challenging to focus without guidance.</li>
              </ul>
              <p className="text-lg mb-4">
                Start with just five minutes a day, and gradually increase the duration of your sessions as you become more comfortable with the practice.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">4. Incorporating Mindfulness into Your Daily Life</h2>
              <p className="text-lg mb-4">
                You don’t need to set aside large amounts of time each day to benefit from mindfulness. Incorporating mindful practices into your everyday activities can help you stay present and grounded throughout the day. Here are a few ways to incorporate mindfulness into your routine:
              </p>
              <ul className="list-disc list-inside mb-4">
                <li className="mb-2">**Mindful Eating**: Pay attention to the flavors, textures, and smells of your food. Eating mindfully helps you stay present and prevents mindless snacking or eating as a way to cope with emotions.</li>
                <li className="mb-2">**Mindful Walking**: Take a walk and focus on the sensations of your feet touching the ground, the sounds around you, and the feeling of the air on your skin. Walking mindfully can be a refreshing break during a busy day.</li>
                <li>**Mindful Conversations**: When talking with someone, give them your full attention. Listen actively without interrupting or thinking about what you’ll say next. Being fully present in conversations strengthens your relationships and helps you stay grounded.</li>
              </ul>
              <p className="text-lg mb-4">
                By practicing mindfulness in these small ways, you can cultivate a sense of peace and awareness that supports your sobriety.
              </p>
            </section>

            <p className="text-lg mb-4">
              Meditation and mindfulness are simple but powerful tools that can help you stay grounded and focused on your sobriety journey. By incorporating these practices into your daily routine, you can build mental strength and resilience, helping you navigate the challenges of recovery and remain committed to your goals.
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default BlogPost5;
