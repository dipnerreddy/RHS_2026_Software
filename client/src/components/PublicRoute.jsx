import { Navigate } from "react-router-dom";
import authService from "../services/authService";

export default function PublicRoute({ children }) {
  return authService.isAuthenticated()
    ? <Navigate to="/home" replace />
    : children;
}