// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}auth/register`, {
        name,
        email,
        password,
      });
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-paper px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl ring-1 ring-black/5 p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-coral mb-1">Get started</p>
        <h2 className="font-display text-2xl font-semibold text-ink mb-6">Create your account</h2>

        {error && (
          <p className="text-sm text-danger bg-danger/10 rounded-lg px-3 py-2 mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border border-black/10 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none px-4 py-2.5 rounded-xl transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-black/10 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none px-4 py-2.5 rounded-xl transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-black/10 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none px-4 py-2.5 rounded-xl transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="bg-coral hover:bg-coral/90 text-white font-semibold py-2.5 rounded-xl transition-colors mt-1">
            Register
          </button>
        </form>

        <p className="mt-6 text-sm text-slate text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-coral font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
