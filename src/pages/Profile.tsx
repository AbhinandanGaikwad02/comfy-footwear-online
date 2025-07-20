// import { useAuth } from "@/hooks/useAuth";

// const Profile = () => {
//   const { user } = useAuth();

//   return (
//     <div className="max-w-xl mx-auto py-10">
//       <h2 className="text-2xl font-bold mb-4">My Profile</h2>
//       <p><strong>Email:</strong> {user?.email}</p>
//       <p><strong>User ID:</strong> {user?.id}</p>
//     </div>
//   );
// };

// export default Profile;

import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

const Profile = () => {
  const { user } = useAuth();
  const metadata = user?.user_metadata || {};

  const [name, setName] = useState(metadata.full_name || "");
  const [phone, setPhone] = useState(metadata.phone || "");
  const [address, setAddress] = useState(metadata.address || "");
  const [status, setStatus] = useState("");

  const handleUpdate = async () => {
    const updates = {
      full_name: name,
      phone,
      address,
    };

    const { error } = await supabase.auth.updateUser({
      data: updates,
    });

    if (error) {
      setStatus("❌ Failed to update profile.");
    } else {
      setStatus("✅ Profile updated successfully.");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>User ID:</strong> {user?.id}</p>

      <div className="mt-4">
        <label className="block font-medium">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-full mt-1"
        />
      </div>

      <div className="mt-4">
        <label className="block font-medium">Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-full mt-1"
        />
      </div>

      <div className="mt-4">
        <label className="block font-medium">Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-full mt-1"
        />
      </div>

      <button
        onClick={handleUpdate}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>

      {status && <p className="mt-2 text-sm text-gray-700">{status}</p>}
    </div>
  );
};

export default Profile;
