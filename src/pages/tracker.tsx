import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

// Sample Motivational Quotes for Each Day
const dailyQuotes = [
  "You’re stronger than you think!",
  "One day at a time.",
  "Keep pushing forward!",
  "Every day is a victory."
];

// Milestone goals
const goals = [7, 14, 30, 60, 90, 365];

const Tracker = () => {
  const [daysSober, setDaysSober] = useState(0);
  const [quote, setQuote] = useState('');
  const [selectedGoal, setSelectedGoal] = useState(30);
  const [currentDate, setCurrentDate] = useState('');

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
      </Head>

      {/* Main Container */}
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 flex items-center justify-center">
        <div className="max-w-3xl w-full p-8 shadow-lg rounded-lg bg-gray-800">
          {/* Header Section */}
          <h1 className="text-5xl font-extrabold text-center text-white mb-8">
            Sober Tracker
          </h1>
          <p className="text-center text-gray-300 text-lg mb-8">
            Track your sober journey and stay motivated with daily progress!
          </p>

          {/* Display current date */}
          <div className="text-center text-gray-300 mb-4">
            <p>Today is: <span className="font-semibold">{currentDate}</span></p>
          </div>

          {/* Dropdown to select goal */}
          <div className="flex justify-center mb-6">
            <label htmlFor="goal" className="text-lg font-medium text-white mr-3">Set Your Goal: </label>
            <select
              id="goal"
              value={selectedGoal}
              onChange={handleGoalChange}
              className="border border-gray-600 bg-gray-700 text-white rounded-lg px-3 py-2 text-lg">
              {goals.map((goal) => (
                <option key={goal} value={goal}>{goal} Days</option>
              ))}
            </select>
          </div>

          {/* Display days sober */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white">You&apos;ve been sober for:</h2>
            <p className="text-6xl font-extrabold text-indigo-400 mt-3">{daysSober} days</p>

            <button
              onClick={handleIncrement}
              className="bg-indigo-600 text-white py-3 px-6 mt-6 rounded-lg font-semibold hover:bg-indigo-700 transition ease-in-out duration-200"
            >
              +1 Day
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-700 rounded-full h-4 mb-10">
            <div
              className="bg-indigo-500 h-4 rounded-full transition-all duration-500 ease-in-out"
              style={{
                width: `${(daysSober / selectedGoal) * 100}%`
              }}
            ></div>
          </div>

          {/* Display daily motivational quote */}
          <div className="text-center text-xl text-indigo-200 italic mb-8">
            &quot;{quote}&quot;
          </div>

          {/* Link to Community */}
          <div className="text-center">
            <Link href="/community" passHref>
              <a className="inline-block bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:from-indigo-500 hover:to-blue-400 transition-all duration-300 ease-in-out transform hover:scale-105">
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
