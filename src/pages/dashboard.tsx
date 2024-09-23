import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store"; // Adjust import if necessary

export default function Dashboard() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user); // Assuming you're storing user info in Redux

  // If user is not authenticated, redirect to login page
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to Your Dashboard!</h1>
        <p className="mt-4">This is where you can track your sobriety progress, goals, and more.</p>
      </div>
    </div>
  );
}
