import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDoc, doc, getDoc } from "firebase/firestore"; // Firestore update and get methods
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Storage methods for image upload
import { firestore, storage } from "../firebase"; // Firestore and Storage imports
import { RootState } from "../redux/store"; // Import RootState
import { closeEditProfileModal } from "../redux/editProfileModalSlice"; // Modal actions
import Modal from "@mui/material/Modal";
import Image from "next/image"; // Use Next.js Image component for optimization

export default function EditProfileModal() {
  const isOpen = useSelector((state: RootState) => state.editProfileModal.editProfileModalOpen); // Modal state
  const user = useSelector((state: RootState) => state.auth.user); // Get current user
  const dispatch = useDispatch();

  const [goal, setGoal] = useState<string>(""); // User goal state
  const [startDate, setStartDate] = useState<string>(""); // User start date state
  const [motivation, setMotivation] = useState<string>(""); // User motivation state
  const [profileImage, setProfileImage] = useState<File | null>(null); // Profile image file state
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [photoURL, setPhotoURL] = useState<string>(""); // State for profile image URL

  // Fetch user data if modal is open and user is logged in
  useEffect(() => {
    if (isOpen && user && user.uid) {
      const fetchUserData = async () => {
        try {
          const userRef = doc(firestore, "users", user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            setGoal(data.goal || "");
            setStartDate(data.startDate || "");
            setMotivation(data.motivation || "");
            setPhotoURL(data.photoURL || ""); // Set profile image URL or fallback to empty string
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [isOpen, user]);

  // Handle profile update submission
  const handleUpdateProfile = async () => {
    if (!user || !user.uid) return;
    setIsLoading(true);

    try {
      const userRef = doc(firestore, "users", user.uid);

      // If the user has uploaded a new profile image
      if (profileImage) {
        const imageRef = ref(storage, `profilePictures/${user.uid}/${profileImage.name}`); // Use user.uid and image name for unique storage path
        const uploadTask = uploadBytesResumable(imageRef, profileImage);

        // Monitor the upload progress
        uploadTask.on(
          "state_changed",
          () => {
            // Optional: Track upload progress
          },
          (error) => {
            console.error("Error uploading image: ", error);
          },
          async () => {
            // On successful upload, get the image download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at: ", downloadURL);

            // Update Firestore with the new profile image URL
            await updateDoc(userRef, {
              goal,
              startDate,
              motivation,
              photoURL: downloadURL, // Set the uploaded image URL in Firestore
            });

            setPhotoURL(downloadURL); // Immediately update the local photoURL state to display the image
            dispatch(closeEditProfileModal()); // Close modal on success
          }
        );
      } else {
        // If no image is uploaded, just update the goal, startDate, and motivation
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

  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(closeEditProfileModal())}
      className="flex justify-center items-center"
    >
      <div className="w-[90%] max-w-md h-auto bg-black text-white border border-gray-700 rounded-lg p-6">
        <h1 className="text-center text-3xl font-bold mb-6">Edit Profile</h1>

        {/* Profile Image Display */}
        <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
          {photoURL ? (
            <Image src={photoURL} alt="Profile" layout="fill" objectFit="cover" /> // Use Next.js Image component
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600">
              No Image
            </div>
          )}
        </div>

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

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfileImage(e.target.files ? e.target.files[0] : null)}
          className="w-full h-10 rounded-md bg-transparent border border-gray-700 p-4 mb-4"
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
