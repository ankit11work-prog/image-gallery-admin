import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Lock, Mail, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/admin/login", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      toast.success("Welcome back, Admin");

      // 🔥 FORCE FULL APP RELOAD SO AUTH GUARD RE-EVALUATES
      window.location.replace("/");

    } catch (err) {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-6 selection:bg-indigo-100">
      <div className="w-full max-w-md">
        {/* Logo/Icon Section */}
        <div className="text-center mb-10">
          <div className="inline-flex bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100 mb-6 transition-transform hover:scale-110 duration-300">
            <ShieldCheck size={40} className="text-indigo-600" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">
            Admin Login
          </h1>
          <p className="text-slate-500 font-medium">
            Access your secure management console
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-white/50 backdrop-blur-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                <Mail size={12} /> Email Address
              </label>
              <input
                type="email"
                placeholder="admin@example.com"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-slate-900 placeholder:text-slate-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                <Lock size={12} /> Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-slate-900 placeholder:text-slate-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-slate-200 active:scale-[0.98] disabled:opacity-70 mt-4"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center mt-8 text-slate-400 text-sm font-medium">
          Authorized personnel only &bull; &copy; 2026
        </p>
      </div>
    </div>
  );
}
