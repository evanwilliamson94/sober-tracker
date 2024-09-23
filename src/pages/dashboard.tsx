// pages/dashboard.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store"; // Import your RootState type

export default function Dashboard() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user); // Adjusted auth state

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to Your Dashboard!</h1>
        <p className="mt-4">Here’s your sobriety progress, goals, and more.</p>
        {/* Add more personalized user content here */}
      </div>
    </div>
  );
}
