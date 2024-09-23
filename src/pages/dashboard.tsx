// src/pages/dashboard.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase"; // Firebase Auth import
import { onAuthStateChanged } from "firebase/auth"; // Firebase User type

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Handle loading state

  // Firebase auth state listener to check if the user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        // Redirect to login if not authenticated
        router.push("/login");
      }
      setLoading(false); // Stop the loading state
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [router]);

  // Show loading state until authentication is checked
  if (loading) {
    return <div>Loading...</div>;
  }

  // Once authenticated, render the dashboard
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-4 sm:p-6">
      <div className="text-center max-w-md sm:max-w-lg mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          Welcome to Your Dashboard!
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-4">
          This is where you can track your sobriety progress, goals, and more.
        </p>
      </div>
    </div>
  );
}
