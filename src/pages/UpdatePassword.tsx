import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [errorFromURL, setErrorFromURL] = useState("");
  const [email, setEmail] = useState("");
  const [resentStatus, setResentStatus] = useState("");
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);

  // ✅ Step 1: Check URL hash for auth errors
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

  // ✅ Step 2: Load session from URL hash
  useEffect(() => {
    const loadSession = async () => {
      await supabase.auth.getSession(); // Ensures token is picked from URL
      setIsSessionLoaded(true);
    };
    loadSession();
  }, []);

  const handleUpdate = async () => {
    if (!password) {
      setStatus("❌ Please enter a new password.");
      return;
    }

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
      redirectTo: "https://comfy-footwear-online.vercel.app/update-password",
    });

    if (error) {
      setResentStatus("❌ Failed to resend reset link.");
    } else {
      setResentStatus("✅ A new reset link has been sent to your email.");
    }
  };

  if (!isSessionLoaded) return <p className="text-center mt-10">Verifying token...</p>;

  return (
    <div className="max-w-md mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Set New Password</h2>

      {errorFromURL ? (
        <>
          <p className="text-red-600 mb-4">{errorFromURL}</p>

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
