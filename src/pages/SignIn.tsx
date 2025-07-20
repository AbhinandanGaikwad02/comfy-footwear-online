
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { User, Key } from "lucide-react";
import { useAuth } from "@/hooks/useAuth"; // ✅ Correct import

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { session } = useAuth(); // ✅ Get session from useAuth

  useEffect(() => {
    if (session) navigate("/");
  }, [session, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Successfully signed in!");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSignIn}>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="mt-1 relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
                <User className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="mt-1 relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10"
                />
                <Key className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <Button type="submit" className="w-full">Sign in</Button>
            <div className="flex justify-between items-center mt-4 text-sm">
  <a
    href="/forgot-password"
    className="text-blue-600 hover:underline"
  >
    Forgot password?
  </a>
  <span>
    New user?{" "}
    <a
      href="/register"
      className="text-blue-600 hover:underline"
    >
      Register here
    </a>
  </span>
</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
