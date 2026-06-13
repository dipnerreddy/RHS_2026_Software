import { useNavigate } from "react-router-dom";

import authService from "../services/authService";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();

    navigate("/login");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Welcome Home 🚀
      </h1>

      <button
        onClick={handleLogout}
        className="mt-6 border px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}