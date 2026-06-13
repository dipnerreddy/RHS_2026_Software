import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">
        Welcome Home 🚀
      </h1>

      <p className="mb-8">
        Authentication is working successfully.
      </p>

      <button
        onClick={handleLogout}
        className="border px-6 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}