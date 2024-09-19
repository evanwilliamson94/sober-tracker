import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Chart } from 'chart.js/auto'; // Importing Chart.js

// Sample Motivational Quotes for Each Day
const dailyQuotes = [
  "You’re stronger than you think!",
  "One day at a time.",
  "Keep pushing forward!",
  "Every day is a victory.",

"You’re stronger than you think!",
"One day at a time.",
"Progress is progress, no matter how small.",
"Believe in yourself.",
"Small steps lead to big changes.",
"Every sober day is a win!",
"You’ve got this!",
"Your journey is worth it.",
"You are more resilient than you realize.",
"Each day brings new strength.",
"Stay committed to the process.",
"You are rewriting your story.",
"Healing happens step by step.",
"Your future is brighter with every choice.",
"Strength grows in moments of challenge.",
"One victory at a time.",
"Trust the process.",
"The best is yet to come.",
"You are enough.",
"One step closer to the person you want to be.",
"Stay focused on what matters.",
"You are building a new foundation.",
"Your determination is inspiring.",
"The power to change is within you.",
"Take pride in how far you’ve come.",
"Your strength is limitless.",
"Each day without gives you more freedom.",
"Progress is better than perfection.",
"Believe in your ability to overcome.",
"You’re doing better than you think.",
"Your struggles have made you stronger.",
"Today is another step forward.",
"Resilience is your superpower.",
"You are mastering your mind.",
"Your courage is your strength.",
"Keep going, even when it's tough.",
"The hardest battles lead to the greatest victories.",
"You are becoming the best version of yourself.",
"Celebrate every win, no matter how small.",
"Your willpower is unshakable.",
"You are in control of your journey.",
"The journey may be hard, but it’s worth it.",
"Your future is built by the choices you make today.",
"You are breaking free and finding peace.",
"Believe in the power of your decisions.",
"Each day sober is a gift to yourself.",
"You are worthy of happiness and freedom.",
"Your story will inspire others.",
"Keep fighting, your future self will thank you.",
"Each new day is a fresh start.",
"Focus on your progress, not the distance left.",
"Your determination will carry you through.",
"You are creating a better life.",
"Recovery is possible and you are living proof.",
"Embrace the journey, it's making you stronger.",
"You are more powerful than your struggles.",
"Don’t quit. Great things take time.",
"Believe you can, and you’re halfway there.",
"It’s not about being perfect, it’s about being better than yesterday.",
"Your commitment to sobriety is your superpower.",
"Keep pushing forward, you’re doing great.",
"Your strength comes from overcoming.",
"Every day is a new opportunity for growth.",
"You are a warrior, and warriors don't quit.",
"With every sober day, you grow stronger.",
"Focus on the journey, not the destination.",
"You are the hero of your story.",
"You are capable of amazing things.",
"It’s okay to take it slow, as long as you don’t stop.",
"Courage doesn’t always roar, sometimes it’s the quiet voice that says 'I’ll try again tomorrow.'",
"You are making progress every day.",
"The greatest battles are won one step at a time.",
"You are worth the effort.",
"One day or day one. You decide.",
"Success is not final, failure is not fatal: It is the courage to continue that counts.",
"You are rising above and creating a better tomorrow.",
"Every day you stay sober is a victory.",
"What you’re doing today will change your future.",
"You’re a fighter, keep going.",
"Your actions today shape your tomorrow.",
"Every challenge makes you stronger.",
"You are moving toward a brighter, healthier future.",
"The struggle you’re in today is building the strength you need for tomorrow.",
"You’ve survived 100% of your worst days, keep going.",
"You’re closer than you were yesterday.",
"You are proving every day how strong you really are.",
"You are changing your life one day at a time.",
"There’s no limit to what you can achieve.",
"Recovery is about progress, not perfection.",
"The choice to stay sober is the choice to stay free.",
"Your best days are still ahead of you.",
"You are resilient, you are brave, you are strong.",
"The power of sobriety is in the freedom it gives you.",
"You are unstoppable when you focus on your goals."
];

// Milestone goals
const goals = [7, 14, 30, 60, 90, 365];

const Tracker = () => {
  const [daysSober, setDaysSober] = useState(0);
  const [quote, setQuote] = useState('');
  const [selectedGoal, setSelectedGoal] = useState(30);
  const [currentDate, setCurrentDate] = useState('');
  const [moodHistory, setMoodHistory] = useState<{ date: string, mood: string }[]>([]);
  const chartRef = useRef<HTMLCanvasElement | null>(null); // useRef for chart
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);

  // Function to generate quote based on the current date
  const getDailyQuote = () => {
    const today = new Date().getDate();
    return dailyQuotes[today % dailyQuotes.length];
  };

  // Increment day and generate quote
  const handleIncrement = () => {
    if (daysSober < selectedGoal) {
      setDaysSober(daysSober + 1);
      setQuote(getDailyQuote());
    }
  };

  // Reset progress when hitting the goal
  const handleReset = () => {
    setDaysSober(0);
  };

  // Handle goal selection
  const handleGoalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGoal(parseInt(event.target.value));
    handleReset();
  };

  // Track mood and update chart
  const handleMoodUpdate = (mood: string) => {
    const newMoodHistory = [...moodHistory, { date: currentDate, mood }];
    setMoodHistory(newMoodHistory);
    
    if (chartInstance) {
      chartInstance.data.labels?.push(currentDate);
      chartInstance.data.datasets[0].data.push(mood === 'Good' ? 3 : mood === 'Okay' ? 2 : 1); // Example values for mood
      chartInstance.update();
    }
  };

  // Initialize Chart
  useEffect(() => {
    if (chartRef.current && !chartInstance) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const newChartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: [],
            datasets: [{
              label: 'Mood Over Time',
              data: [],
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: { beginAtZero: true }
            }
          }
        });
        setChartInstance(newChartInstance);
      }
    }
  }, [chartRef, chartInstance]);

  // On component mount, set the initial quote and date
  useEffect(() => {
    setQuote(getDailyQuote());

    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(today.toLocaleDateString(undefined, options));
  }, []);

  return (
    <>
      <Head>
        <title>Sober Tracker - Track Your Sobriety Journey</title>
        <meta
          name="description"
          content="Sober Tracker helps you stay motivated on your sobriety journey with personalized tracking, mood monitoring, and motivational quotes."
        />
        <meta
          name="keywords"
          content="sobriety tracker, sober support, addiction recovery, daily motivation, sobriety community"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/tracker" />
        <meta property="og:title" content="Sober Tracker - Track Your Sobriety Journey" />
        <meta property="og:description" content="Track your sobriety journey with personalized tools, mood tracking, and community support." />
        <meta property="og:image" content="https://yourwebsite.com/images/sober-tracker-sharing-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://yourwebsite.com/tracker" />
        <meta property="twitter:title" content="Sober Tracker - Track Your Sobriety Journey" />
        <meta property="twitter:description" content="Track your sobriety journey with personalized tools, mood tracking, and community support." />
        <meta property="twitter:image" content="https://yourwebsite.com/images/sober-tracker-sharing-image.jpg" />
      </Head>

      <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center animate-darkToLightFadeIn"
        style={{ backgroundImage: 'url(/Sober-tracker-countdown.png)' }}>
        <div className="bg-black bg-opacity-30 absolute inset-0"></div> {/* Overlay */}
        <div className="relative z-10 max-w-4xl p-8 mt-10 bg-white bg-opacity-0 shadow-lg rounded-lg">
          <h1 className="text-5xl font-extrabold text-center text-cyan-950 mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Sober Tracker
          </h1>
          <p className="text-center text-gray-800 text-xl">Track your sober journey and stay motivated with daily progress!</p>

          {/* Display current date */}
          <div className="text-center text-xl text-gray-800 mt-4">
            <p>Today is: <span className="font-semibold">{currentDate}</span></p>
          </div>

          {/* Dropdown to select goal */}
          <div className="mt-6 flex justify-center">
            <label htmlFor="goal" className="text-lg font-medium text-gray-800 mr-2">Set Your Goal: </label>
            <select
              id="goal"
              value={selectedGoal}
              onChange={handleGoalChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-lg">
              {goals.map((goal) => (
                <option key={goal} value={goal}>{goal} Days</option>
              ))}
            </select>
          </div>

          {/* Display days sober */}
          <div className="mt-10 text-center">
            <h2 className="text-3xl font-bold">You&apos;ve been sober for:</h2> {/* Fixed apostrophe issue */}
            <p className="text-6xl font-extrabold text-yellow-300 mt-4">{daysSober} days</p>

            <button
              onClick={handleIncrement}
              className="bg-indigo-600 neon-button text-white py-3 px-8 mt-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 shadow-lg transition-transform transform hover:scale-105"
            >
              +1 Day
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-8 w-full bg-gray-200 rounded-full h-6 shadow-md">
            <div
              className="bg-indigo-600 h-6 rounded-full transition-all duration-500 ease-in-out"
              style={{
                width: `${(daysSober / selectedGoal) * 100}%`,
                background: 'linear-gradient(90deg, #6b8bff, #ff8bff)',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
              }}>
            </div>
          </div>

          {/* Display daily motivational quote */}
          <div className="mt-8 text-center text-xl text-indigo-600 italic">
            &quot;{quote}&quot;
          </div>

          {/* Mood Tracker */}
          <div className="mt-10 text-center">
            <h2 className="text-3xl font-semibold">Track Your Mood</h2>
            <div className="flex justify-center space-x-6 mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={() => handleMoodUpdate('Good')}>
                Good
              </button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg" onClick={() => handleMoodUpdate('Okay')}>
                Okay
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => handleMoodUpdate('Bad')}>
                Bad
              </button>
            </div>
          </div>

          {/* Chart for Mood Tracking */}
          <div className="mt-10">
            <canvas id="sobrietyChart" ref={chartRef} height="100"></canvas>
          </div>

          {/* Link to Community */}
          <div className="mt-10 text-center">
            <Link href="/community">
              <a className="text-indigo-600 text-lg underline hover:text-indigo-800 transition-colors">
                Join the Community for More Support
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tracker;
