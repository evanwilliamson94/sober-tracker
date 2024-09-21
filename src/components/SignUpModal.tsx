import { closeSignupModal } from "../redux/modalSlice";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { RootState } from "../redux/store"; // Import the RootState type

export default function SignupModal() {
  const isOpen = useSelector((state: RootState) => state.modals.signupModalOpen); // Properly type useSelector
  const dispatch = useDispatch();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [motivation, setMotivation] = useState<string>("");
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);

  async function handleSignUp() {
    if (!auth) {
      console.error("Firebase auth is not initialized");
      return;
    }

    try {
      if (agreeToTerms) {
        await createUserWithEmailAndPassword(auth, email, password);
        // Additional logic to save 'goal', 'startDate', and 'motivation' can be implemented here
      } else {
        alert("Please agree to the Terms and Conditions");
      }
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  }

  return (
    <>
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
            className="bg-white text-black w-full rounded-md py-2 mt-4 font-bold"
            onClick={handleSignUp}
          >
            Create Account
          </button>
        </div>
      </Modal>
    </>
  );
}
