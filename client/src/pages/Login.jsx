import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import authService from "../services/authService";


export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");

    const response = await authService.login(formData);

    localStorage.setItem("token", response.token);

    navigate("/home");
  } catch (err) {
    setError(
      err.response?.data?.message ||
      "Login failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 border rounded-lg"
      >
        <h1 className="text-2xl font-bold mb-6">
          Login
        </h1>

        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full border p-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-4 flex justify-between">
          <Link to="/register">
            Register
          </Link>

          <Link to="/forgot-password">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}