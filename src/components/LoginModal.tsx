import { closeLoginModal, openLoginModal } from "../redux/modalSlice";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { RootState } from "../redux/store"; // Import the RootState type

export default function LoginModal() {
  const isOpen = useSelector((state: RootState) => state.modals.loginModalOpen); // Properly type useSelector
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  async function handleSignIn() {
    if (!auth) {
      console.error("Firebase auth is not initialized");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.reload();
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  }

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        className="flex justify-center items-center"
      >
        <div className="w-[90%] max-w-md h-auto bg-black text-white border border-gray-700 rounded-lg p-6">
          <h1 className="text-center text-3xl font-bold mb-6">
            Sign into your account
          </h1>
          <input
            placeholder="Email"
            className="w-full h-10 rounded-md bg-transparent border border-gray-700 p-4 mb-4"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            className="w-full h-10 rounded-md bg-transparent border border-gray-700 p-4 mb-6"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-white text-black w-full rounded-md py-2 font-bold"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>
      </Modal>
    </>
  );
}
