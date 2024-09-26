import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDoc, doc, getDoc } from "firebase/firestore"; // Firestore methods
import { firestore } from "../firebase"; // Import Firestore instance
import { RootState } from "../redux/store"; // Import RootState for type
import { closeEditProfileModal } from "../redux/editProfileModalSlice"; // Modal actions
import Modal from "@mui/material/Modal";

// Define a type for the user data
interface UserData {
  goal: string;
  startDate: string;
  motivation: string;
}

export default function EditProfileModal() {
  const isOpen = useSelector((state: RootState) => state.editProfileModal.editProfileModalOpen); // Modal state
  const user = useSelector((state: RootState) => state.auth.user); // Get current user from Redux
  const dispatch = useDispatch();

  const [goal, setGoal] = useState<string>(""); // User goal state
  const [startDate, setStartDate] = useState<string>(""); // User start date state
  const [motivation, setMotivation] = useState<string>(""); // User motivation state
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  // Fetch user data if modal is open and user is logged in
  useEffect(() => {
    if (isOpen && user && user.uid) {
      // Fetch current user data and populate fields
      async function fetchUserData() {
        try {
          const userRef = doc(firestore, "users", user.uid); // Reference to the user's Firestore document
          const userDoc = await getDoc(userRef); // Fetch user document

          if (userDoc.exists()) {
            const data = userDoc.data() as UserData;
            setGoal(data.goal);
            setStartDate(data.startDate);
            setMotivation(data.motivation);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

      fetchUserData();
    }
  }, [isOpen, user]);

  // Handle profile update submission
  const handleUpdateProfile = async () => {
    if (!user || !user.uid) return; // Check if user and user.uid exist
    setIsLoading(true);

    try {
      const userRef = doc(firestore, "users", user.uid); // Reference to the user document

      // Update user document in Firestore
      await updateDoc(userRef, {
        goal,
        startDate,
        motivation,
      });

      dispatch(closeEditProfileModal()); // Close modal on success
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(closeEditProfileModal())}
      className="flex justify-center items-center"
    >
      <div className="w-[90%] max-w-md h-auto bg-black text-white border border-gray-700 rounded-lg p-6">
        <h1 className="text-center text-3xl font-bold mb-6">Edit Profile</h1>
        <input
          placeholder="Sobriety Goal (e.g., 30 days)"
          className="w-full h-10 rounded-md bg-transparent border border-gray-700 p-4 mb-4"
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <input
          placeholder="Sobriety Start Date"
          className="w-full h-10 rounded-md bg-transparent border border-gray-700 p-4 mb-4"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <textarea
          placeholder="Why are you choosing sobriety?"
          className="w-full rounded-md bg-transparent border border-gray-700 p-4 mb-4"
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
        />
        <button
          className={`w-full rounded-md py-2 mt-4 font-bold ${
            isLoading ? "bg-gray-500" : "bg-white text-black"
          }`}
          onClick={handleUpdateProfile}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </Modal>
  );
}
