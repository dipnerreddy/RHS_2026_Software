import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import authService from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await authService.register(formData);

      setSuccess(response.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed"
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
          Register
        </h1>

        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-600 mb-4">
            {success}
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full border p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
}