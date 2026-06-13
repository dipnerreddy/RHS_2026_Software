import { useNavigate } from "react-router-dom";

import {
  getUser,
  logoutUser,
} from "../utils/authStorage";

export default function Home() {
  const navigate =
    useNavigate();

  const user =
    getUser();

  const handleLogout =
    () => {
      logoutUser();

      navigate(
        "/login"
      );
    };

  const renderDashboard =
    () => {
      switch (
        user?.role
      ) {
        case "CLASS_TEACHER":
          return (
            <h2 className="text-2xl font-semibold">
              Attendance Dashboard
            </h2>
          );

        case "BILLING_STAFF":
          return (
            <h2 className="text-2xl font-semibold">
              Billing Dashboard
            </h2>
          );

        case "HOD":
          return (
            <h2 className="text-2xl font-semibold">
              HOD Dashboard
            </h2>
          );

        case "SUPER_ADMIN":
          return (
            <h2 className="text-2xl font-semibold">
              Admin Dashboard
            </h2>
          );

        default:
          return (
            <h2 className="text-2xl font-semibold">
              Unknown Role
            </h2>
          );
      }
    };

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome,{" "}
            {
              user?.name
            }
          </h1>

          <p className="text-gray-600">
            Role:{" "}
            {
              user?.role
            }
          </p>
        </div>

        <button
          onClick={
            handleLogout
          }
          className="border px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="border rounded-lg p-6">
        {renderDashboard()}
      </div>
    </div>
  );
}