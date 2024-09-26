import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDoc, doc } from "firebase/firestore"; // Firestore update methods
import { firestore } from "../firebase"; // Import Firestore
import { RootState } from "../redux/store"; // Import RootState
import { closeEditProfileModal } from "../redux/editProfileModalSlice"; // Modal actions
import Modal from "@mui/material/Modal";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"; // For file uploads
import { storage } from "../firebase"; // Firebase storage instance
import Image from "next/image";

interface UserData {
  goal: string;
  startDate: string;
  motivation: string;
  photoURL?: string; // Optional photo URL field
}

export default function EditProfileModal() {
  const isOpen = useSelector((state: RootState) => state.editProfileModal.editProfileModalOpen); // Modal state
  const user = useSelector((state: RootState) => state.auth.user); // Get current user
  const dispatch = useDispatch();

  const [goal, setGoal] = useState<string>(""); // User goal state
  const [startDate, setStartDate] = useState<string>(""); // User start date state
  const [motivation, setMotivation] = useState<string>(""); // User motivation state
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [photoURL, setPhotoURL] = useState<string>(user?.photoURL || "/default-profile.png"); // Profile picture state
  const [newPhotoFile, setNewPhotoFile] = useState<File | null>(null); // Store selected photo file

  // Fetch user data if modal is open and user is logged in
  useEffect(() => {
    if (isOpen && user) {
      // Fetch current user data and populate fields (omitted for simplicity)
    }
  }, [isOpen, user]);

  // Handle profile update submission
  const handleUpdateProfile = async () => {
    if (!user) return;
    setIsLoading(true);

    try {
      const userRef = doc(firestore, "users", user.uid);

      // If a new profile picture has been selected, upload it
      if (newPhotoFile) {
        const storageRef = ref(storage, `profile_pictures/${user.uid}`);
        const uploadTask = uploadBytesResumable(storageRef, newPhotoFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.error("Error uploading image:", error);
          },
          async () => {
            // Get the download URL after successful upload
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setPhotoURL(downloadURL); // Update the photo URL state

            // Update user document with new photoURL and other data
            await updateDoc(userRef, {
              goal,
              startDate,
              motivation,
              photoURL: downloadURL,
            });

            dispatch(closeEditProfileModal()); // Close modal on success
          }
        );
      } else {
        // Update user document without new photo
        await updateDoc(userRef, {
          goal,
          startDate,
          motivation,
        });

        dispatch(closeEditProfileModal()); // Close modal on success
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image file selection
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPhotoFile(file);
      setPhotoURL(URL.createObjectURL(file)); // Show live preview
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

        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center mb-4">
          <Image
            src={photoURL}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full mb-2"
          />
          <label className="text-sm font-bold">Change Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="mt-2"
          />
        </div>

        {/* Other Profile Inputs */}
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
