import { closeSignupModal } from "../redux/modalSlice";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore methods
import { useState } from "react";
import { auth, firestore } from "../firebase"; // Import Firestore instance
import { useRouter } from "next/router"; // Import useRouter for navigation
import { RootState } from "../redux/store"; // Import the RootState type
import { FirebaseError } from "firebase/app"; // Import FirebaseError type

export default function SignupModal() {
  const isOpen = useSelector((state: RootState) => state.modals.signupModalOpen);
  const dispatch = useDispatch();
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [motivation, setMotivation] = useState<string>("");
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Add loading state

  async function handleSignUp() {
    if (!auth) {
      console.error("Firebase auth is not initialized");
      return;
    }

    try {
      if (!agreeToTerms) {
        alert("Please agree to the Terms and Conditions");
        return;
      }

      setIsLoading(true); // Set loading state

      // Sign up the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional data such as goal, startDate, and motivation to Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        name: name,
        email: email,
        goal: goal,
        startDate: startDate,
        motivation: motivation,
        uid: user.uid,
        createdAt: new Date().toISOString(), // Track when the user signed up
      });

      // Close the modal after successful signup
      dispatch(closeSignupModal());

      // Redirect to dashboard after successful signup
      router.push("/dashboard");
    } catch (error) {
      // Handle FirebaseError
      if (error instanceof FirebaseError) {
        console.error("Error signing up: ", error.message);
        alert("There was an error signing up: " + error.message);
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false); // Stop loading state after completion
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(closeSignupModal())}
      className="flex justify-center items-center"
    >
      <div className="w-[90%] max-w-md h-auto bg-black text-white border border-gray-700 rounded-lg p-6">
        <h1 className="text-center text-3xl font-bold mb-6">
          Create your Account
        </h1>
        <input
          placeholder="Full Name"
          className="w-full h-10 rounded-md bg-transparent border border-gray-700 p-4 mb-4"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          className="w-full h-10 rounded-md bg-transparent border border-gray-700 p-4 mb-4"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          className="w-full h-10 rounded-md bg-transparent border border-gray-700 p-4 mb-4"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* New Fields */}
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
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="mr-2"
          />
          I agree to the <a href="/terms" className="text-indigo-500">Terms and Conditions</a>
        </label>

        <button
          className={`w-full rounded-md py-2 mt-4 font-bold ${
            isLoading ? "bg-gray-500" : "bg-white text-black"
          }`}
          onClick={handleSignUp}
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? "Signing Up..." : "Create Account"}
        </button>
      </div>
    </Modal>
  );
}
