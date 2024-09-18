import Image from 'next/image';

const BlogPost3 = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">The Power of Daily Sober Motivation</h1>

      <Image
        src="/daily-sober-motivation.png"
        alt="Person reflecting with a motivational quote to stay focused on their sober journey."
        width={800}
        height={400}
        className="rounded-lg mx-auto mb-6"
      />

      <p className="text-lg mb-4">
        Staying motivated each day is key to long-term sobriety. Daily motivation can give you the strength to push through difficult moments and stay focused on your recovery goals. Here’s how you can incorporate sober motivation into your daily life.
      </p>

      <h2 className="text-3xl font-semibold mb-4">1. Start Your Day with Affirmations</h2>
      <p className="text-lg mb-4">
        Morning affirmations can set a positive tone for the rest of the day. Simple phrases like “I am in control” or “I am stronger than my addiction” can shift your mindset and help you focus on your goals.
      </p>

      <h2 className="text-3xl font-semibold mb-4">2. Use Visual Reminders</h2>
      <p className="text-lg mb-4">
        Keep motivational quotes and images where you can see them. Whether it’s a sticky note on your mirror or a quote as your phone wallpaper, visual reminders keep you grounded and committed to your sobriety.
      </p>

      <h2 className="text-3xl font-semibold mb-4">3. Reflect on Your Progress</h2>
      <p className="text-lg mb-4">
        Take a moment each day to reflect on how far you’ve come in your sobriety journey. Celebrate your victories, no matter how small. Daily reflection keeps you motivated and reminds you of the progress you’ve made.
      </p>

      <h2 className="text-3xl font-semibold mb-4">4. Share Your Journey</h2>
      <p className="text-lg mb-4">
        Whether it’s through a journal, social media, or a support group, sharing your journey can motivate others and reinforce your commitment to sobriety. Helping others can also be a great source of motivation.
      </p>

      <p className="text-lg mb-4">With daily motivation, you can stay strong and focused on your recovery, one day at a time.</p>
    </div>
  );
};

export default BlogPost3;
