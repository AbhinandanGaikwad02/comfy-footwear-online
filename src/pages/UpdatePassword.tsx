import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [resentStatus, setResentStatus] = useState("");
  const [errorFromURL, setErrorFromURL] = useState("");
  const [sessionRestored, setSessionRestored] = useState(false);

  // ✅ 1. Check for expired/invalid token
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

  // ✅ 2. Wait until Supabase restores session from URL
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) {
        setSessionRestored(true);
      }
    });

    // ✅ Manually trigger session fetch
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setSessionRestored(true);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // ✅ 3. Handle password update
  const handleUpdate = async () => {
    if (!password) {
      setStatus("❌ Please enter a new password.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error(error); // helpful for debug
      setStatus("❌ Failed to update password.");
    } else {
      setStatus("✅ Password updated successfully!");
      setTimeout(() => navigate("/signin"), 2000);
    }
  };

  // ✅ 4. Handle resend password reset
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

  if (!sessionRestored && !errorFromURL)
    return <p className="text-center mt-10">🔐 Verifying reset token...</p>;

  return (
    <div className="max-w-md mx-auto py-10 px-4">
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
