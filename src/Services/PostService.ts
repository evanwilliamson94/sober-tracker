import { firestore, storage } from "../firebase"; // Import Firestore and Storage
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Function to create a new post and optionally upload an image
export const createPost = async (userId: string, content: string, imageFile: File | null) => {
  try {
    let imageUrl = null;

    if (imageFile) {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `postImages/${userId}/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          async () => {
            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(imageUrl);
          }
        );
      });
    }

    // Add the post data to Firestore
    await addDoc(collection(firestore, "posts"), {
      userId,
      content,
      imageUrl, // Save the image URL if available
      createdAt: Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    console.error("Error creating post: ", error);
  }
};
