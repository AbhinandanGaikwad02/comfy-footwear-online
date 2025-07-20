import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [errorFromURL, setErrorFromURL] = useState("");
  const [email, setEmail] = useState(""); // For resending reset
  const [resentStatus, setResentStatus] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    if (
      hash.includes("error_code=otp_expired") ||
      hash.includes("error_description=Email+link+is+invalid")
    ) {
      setErrorFromURL(
        "This link is invalid or has expired. You can request a new password reset link below."
      );
    }
  }, []);

  const handleUpdate = async () => {
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus("❌ Failed to update password.");
    } else {
      setStatus("✅ Password updated successfully!");
      setTimeout(() => navigate("/signin"), 2000);
    }
  };

  const handleResendReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:8080/update-password", // ✅ Change this for production
    });

    if (error) {
      setResentStatus("❌ Failed to resend reset link.");
    } else {
      setResentStatus("✅ A new reset link has been sent to your email.");
    }
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Set New Password</h2>

      {errorFromURL ? (
        <>
          <p className="text-red-600 mb-4">{errorFromURL}</p>

          {/* 🔁 Resend Reset Link */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-2"
          />
          <button
            onClick={handleResendReset}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Resend Reset Link
          </button>
          {resentStatus && <p className="mt-3 text-sm text-gray-700">{resentStatus}</p>}
        </>
      ) : (
        <>
          {/* ✅ Show only if link is valid */}
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-4"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Update Password
          </button>
          {status && <p className="mt-4 text-sm text-gray-600">{status}</p>}
        </>
      )}
    </div>
  );
};

export default UpdatePassword;
