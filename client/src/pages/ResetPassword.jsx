import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import authService from "../services/authService";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
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

    setError("");
    setSuccess("");

    const { password, confirmPassword } = formData;

    if (!password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await authService.resetPassword(
        token,
        password
      );

      setSuccess(response.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Password reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border rounded-lg p-6 shadow">
        <h1 className="text-2xl font-bold mb-6">
          Reset Password
        </h1>

        {error && (
          <div className="mb-4 p-3 border rounded text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 border rounded text-green-600">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">
              New Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full border rounded p-2"
          >
            {loading
              ? "Resetting Password..."
              : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}