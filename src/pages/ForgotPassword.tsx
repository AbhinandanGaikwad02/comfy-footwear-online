import { useState } from "react";
import { supabase } from "@/lib/supabase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:8080/update-password", // Adjust in prod
    });

    if (error) {
      setMessage("Failed to send reset email.");
    } else {
      setMessage("Check your email for the reset link.");
    }
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
      />
      <button
        onClick={handleReset}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send Reset Link
      </button>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
