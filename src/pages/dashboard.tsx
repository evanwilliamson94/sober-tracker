import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { auth } from "../firebase"; // Firebase Auth import
import { onAuthStateChanged, User } from "firebase/auth"; // Firebase User type
import { RootState } from "../redux/store"; // RootState import

export default function Dashboard() {
  const router = useRouter();
  
  // Select user from Redux state
  const reduxUser = useSelector((state: RootState) => state.auth.user); 
  
  const [loading, setLoading] = useState(true); // Handle loading state
  const [user, setUser] = useState<User | null>(null); // Local state for Firebase user

  // Firebase auth state listener to check if the user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Set user from Firebase Auth
        setUser(firebaseUser);
      } else {
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
