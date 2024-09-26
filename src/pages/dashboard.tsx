import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, collection, getDocs, query, where, getDoc, updateDoc } from "firebase/firestore"; // Firestore methods
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase storage for image upload
import { auth, firestore, storage } from "../firebase"; // Firestore, Auth, and Storage imports
import { RootState } from "../redux/store";
import { setUser, clearUser } from "../redux/authSlice";
import { openEditProfileModal } from "../redux/editProfileModalSlice"; // Import action to open modal
import Image from "next/image"; // Next.js Image component
import EditProfileModal from "../components/EditProfileModal"; // Import modal component

// Define a type for the post
interface Post {
  id: string;
  title: string;
  description: string;
  userId: string; // Assuming there's a userId field in your posts
}

// Define a type for additional user data
interface UserData {
  goal: string;
  startDate: string;
  motivation: string;
  photoURL?: string;
}

// Function to calculate days sober based on start date
const calculateDaysSober = (startDate: string): number => {
  const start = new Date(startDate);
  const today = new Date();
  const differenceInTime = today.getTime() - start.getTime();
  return Math.floor(differenceInTime / (1000 * 3600 * 24));
};

export default function Dashboard() {
  const [userPosts, setUserPosts] = useState<Post[]>([]); // Posts state
  const [userData, setUserData] = useState<UserData | null>(null); // User data from Firestore
  const [daysSober, setDaysSober] = useState<number>(0); // Track days sober
  const [loading, setLoading] = useState(true); // Loading state
  const [profileImage, setProfileImage] = useState<File | null>(null); // Profile image state
  const [uploading, setUploading] = useState(false); // Uploading state for profile image
  const [photoURL, setPhotoURL] = useState<string>(""); // Photo URL state

  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();

  // Fetch user's additional Firestore data (goal, startDate, motivation, photoURL)
  const fetchUserData = async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(firestore, "users", userId)); // Get user document
      if (userDoc.exists()) {
        const data = userDoc.data() as UserData;
        setUserData(data);
        setDaysSober(calculateDaysSober(data.startDate)); // Calculate days sober
        setPhotoURL(data.photoURL || "/default-profile.png"); // Set photo URL
      } else {
        console.error("No user data found!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch user's posts from Firestore
  const fetchUserPosts = async (userId: string) => {
    try {
      const q = query(collection(firestore, "posts"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const posts: Post[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setUserPosts(posts); // Set retrieved posts
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };

  // Handle profile image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfileImage(e.target.files[0]);
    }
  };

  // Upload profile image to Firebase Storage
  const handleImageUpload = async () => {
    if (!profileImage || !user) return;
    setUploading(true);

    try {
      const storageRef = ref(storage, `profilePictures/${user.uid}/${profileImage.name}`); // Updated path to match storage rules
      const uploadTask = uploadBytesResumable(storageRef, profileImage);

      uploadTask.on(
        "state_changed",
        () => {
          // Optional: Track upload progress here
        },
        (error) => {
          console.error("Error during image upload:", error);
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateDoc(doc(firestore, "users", user.uid), { photoURL: downloadURL }); // Update Firestore
          setPhotoURL(downloadURL); // Update local state
          setUploading(false);
        }
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            photoURL: firebaseUser.photoURL || "/default-profile.png",
            displayName: firebaseUser.displayName || "Anonymous User",
          })
        );

        // Fetch user data and posts
        await fetchUserData(firebaseUser.uid);
        await fetchUserPosts(firebaseUser.uid);
      } else {
        dispatch(clearUser());
        router.push("/login");
      }
      setLoading(false); // Stop loading
    });

    return () => unsubscribe();
  }, [dispatch, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {/* Profile Section */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8 mb-8 flex flex-col md:flex-row items-center md:items-start">
        <Image
          src={photoURL || "/default-profile.png"} // Ensure the correct photo URL is used
          alt="Profile Picture"
          width={100}
          height={100}
          className="rounded-full border border-gray-300"
        />
        <div className="ml-0 md:ml-6 mt-4 md:mt-0 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800">{user?.displayName || "User Name"}</h1>
          <p className="text-lg text-gray-600">Sobriety Goal: {userData?.goal || "Set your goal"}</p>
          <p className="text-lg text-gray-600">Start Date: {userData?.startDate || "Set your start date"}</p>
          <p className="text-lg text-gray-600">Motivation: {userData?.motivation || "Set your motivation"}</p>
          <p className="text-lg text-gray-600">Days Sober: <strong>{daysSober}</strong></p>

          {/* Upload Profile Image Section */}
          <div className="mt-4">
            <input type="file" onChange={handleImageChange} />
            <button
              className={`mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handleImageUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
          </div>

          <button
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            onClick={() => dispatch(openEditProfileModal())} // Trigger modal on click
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* User Posts Section */}
      <div className="w-full max-w-3xl">
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

      {/* Include the EditProfileModal */}
      <EditProfileModal />
    </div>
  );
}
