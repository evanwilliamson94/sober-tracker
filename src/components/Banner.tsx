import React from "react";
import { useDispatch } from "react-redux";
import { openLoginModal, openSignupModal } from "../redux/modalSlice";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa"; // For icons

const Banner: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="fixed bottom-0 w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-4 px-4 text-center shadow-lg z-50">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center">
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome to Stay Sober Tracker</h2>
          <p className="text-sm md:text-lg">
            Take control of your sobriety journey with personalized tracking, support, and motivation.
          </p>
        </div>

        {/* Buttons centered on all screen sizes */}
        <div className="flex flex-col md:flex-row md:space-x-4 justify-center">
          <button
            className="flex items-center justify-center bg-white text-indigo-600 hover:bg-gray-100 py-2 px-6 rounded-lg font-bold transition duration-300 transform hover:scale-105 mb-3 md:mb-0"
            onClick={() => dispatch(openLoginModal())}
          >
            <FaSignInAlt className="mr-2" /> Log In
          </button>
          <button
            className="flex items-center justify-center bg-white text-indigo-600 hover:bg-gray-100 py-2 px-6 rounded-lg font-bold transition duration-300 transform hover:scale-105"
            onClick={() => dispatch(openSignupModal())}
          >
            <FaUserPlus className="mr-2" /> Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;


