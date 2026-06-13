import { useState } from "react";
import authService from "../services/authService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response =
      await authService.forgotPassword(
        email
      );

    setMessage(response.message);
  };

  return (
    <div className="p-8">
      <h1>Forgot Password</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email"
        />

        <button type="submit">
          Send Reset Link
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}