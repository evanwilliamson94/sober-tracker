import React from "react";
import { useDispatch } from "react-redux";
import { openLoginModal, openSignupModal } from "../redux/modalSlice";

const Banner: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="bg-indigo-600 text-white py-6 px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Welcome to Stay Sober Tracker</h2>
      <p className="text-lg mb-6">
        Take control of your sobriety journey with personalized tracking, support, and motivation.
      </p>
      <div className="flex justify-center space-x-4">
        <button
          className="bg-white text-indigo-600 hover:bg-gray-100 py-2 px-6 rounded-lg font-bold transition duration-300"
          onClick={() => dispatch(openLoginModal())}
        >
          Log In
        </button>
        <button
          className="bg-white text-indigo-600 hover:bg-gray-100 py-2 px-6 rounded-lg font-bold transition duration-300"
          onClick={() => dispatch(openSignupModal())}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Banner;
