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
      const { data } = await axios.post(`${API_URL}/auth/register`, {
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
    <div className="max-w-md mx-auto mt-10 p-6 shadow-xl rounded bg-white">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
