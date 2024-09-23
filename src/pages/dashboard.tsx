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
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to Your Dashboard!</h1>
        <p className="mt-4">This is where you can track your sobriety progress, goals, and more.</p>
      </div>
    </div>
  );
}
