import { closeLoginModal } from "../redux/modalSlice";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { RootState } from "../redux/store";
import { FirebaseError } from "firebase/app";

export default function LoginModal() {
  const isOpen = useSelector((state: RootState) => state.modals.loginModalOpen);
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // Add loading state

  // Function to handle login
  async function handleSignIn() {
    if (!auth) {
      console.error("Firebase auth is not initialized");
      return;
    }

    try {
      setIsLoading(true); // Set loading state to true during login attempt

      await signInWithEmailAndPassword(auth, email, password);

      // Close the login modal after successful sign-in
      dispatch(closeLoginModal());

      // Redirect to the dashboard
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("Error signing in: ", error.message);
        alert("There was an error signing in: " + error.message);
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false); // Stop loading state after login attempt
    }
  }

  // Function to handle keypress event
  function handleKeyPress(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      handleSignIn(); // Trigger the sign-in function when Enter is pressed
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(closeLoginModal())}
      className="flex justify-center items-center"
    >
      <div className="w-[90%] max-w-md h-auto bg-black text-white border border-gray-700 rounded-lg p-6">
        <h1 className="text-center text-3xl font-bold mb-6">Sign into your account</h1>
        <input
          placeholder="Email"
          className="w-full h-10 rounded-md bg-transparent border border-gray-700 p-4 mb-4"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress} // Add event listener for "Enter" key
        />
        <input
          placeholder="Password"
          className="w-full h-10 rounded-md bg-transparent border border-gray-700 p-4 mb-6"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress} // Add event listener for "Enter" key
        />
        <button
          className={`w-full rounded-md py-2 font-bold ${
            isLoading ? "bg-gray-500" : "bg-white text-black"
          }`}
          onClick={handleSignIn}
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </div>
    </Modal>
  );
}
