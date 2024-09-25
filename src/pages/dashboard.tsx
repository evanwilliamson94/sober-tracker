import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore methods
import { auth, firestore } from "../firebase"; // Firestore instance and Auth import
import { RootState } from "../redux/store";
import { setUser, clearUser } from "../redux/authSlice";
import Image from "next/image"; // Next.js Image component

// Define a type for the post
interface Post {
  id: string;
  title: string;
  description: string;
  userId: string; // Assuming there's a userId field in your posts
}

export default function Dashboard() {
  const [userPosts, setUserPosts] = useState<Post[]>([]); // Define posts with the Post type
  const [loading, setLoading] = useState(true); // Loading state
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();

  // Fetch user's posts from Firestore
  const fetchUserPosts = async (userId: string) => {
    try {
      const q = query(collection(firestore, "posts"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      const posts: Post[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[]; // Ensure it's typed as Post[]

      setUserPosts(posts); // Set the retrieved posts
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (firebaseUser) {
        // Set user data in Redux
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            photoURL: firebaseUser.photoURL || "/default-profile.png", // Default profile picture
            displayName: firebaseUser.displayName || "Anonymous User",
            goal: "30 Days" // Placeholder for the goal, you can fetch this from Firestore later
          })
        );

        // Fetch user posts from Firestore
        await fetchUserPosts(firebaseUser.uid);
      } else {
        dispatch(clearUser());
        router.push("/login");
      }
      setLoading(false); // Stop the loading state
    });

    return () => unsubscribe();
  }, [dispatch, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {/* Profile Section */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6 mb-6">
        <div className="flex items-center">
          <Image
            src={user?.photoURL || "/default-profile.png"}
            alt="Profile Picture"
            width={64} // Replace with appropriate dimensions
            height={64}
            className="rounded-full"
          />
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{user?.displayName || "User Name"}</h1>
            <p className="text-gray-500">Sobriety Goal: {user?.goal || "Set your goal"}</p>
          </div>
        </div>
        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg">Edit Profile</button>
      </div>

      {/* User Posts Section */}
      <div className="w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Your Posts</h2>
        {userPosts.length === 0 ? (
          <p className="text-gray-500">You haven&apos;t posted anything yet!</p> 
        ) : (
          userPosts.map((post) => (
            <div key={post.id} className="bg-white shadow-lg rounded-lg p-4 mb-4">
              <h3 className="font-bold">{post.title}</h3>
              <p>{post.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
