import axios from "axios";
import API_BASE_URL from "../config/api";

const API_URL = `${API_BASE_URL}/api/auth`;

const authService = {
  /// Register a new user by sending their details to the server
  register: async (userData) => {
    const response = await axios.post(
      `${API_URL}/register`,
      userData
    );
    return response.data;
  },
  /// Login by sending credentials to the server and storing the returned token
  login: async (credentials) => {
    const response = await axios.post(
      `${API_URL}/login`,
      credentials
    );

    return response.data;
  },
  /// Logout by removing the token from localStorage
  logout: () => {
    localStorage.removeItem("token");
  },
  /// Fetch user profile using the stored token
  getToken: () => {
    return localStorage.getItem("token");
  },
  /// Check if user is authenticated by verifying the presence of a token
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
  /// Fetch user profile using the stored token
  getProfile: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(
      `${API_URL}/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  },
  /// Request a password reset link by sending the user's email to the server
  forgotPassword: async (email) => {
    const response = await axios.post(
      `${API_URL}/forgot-password`,
      { email }
    );

    return response.data;
  },
  /// Reset password by sending the new password and reset token to the server
  resetPassword: async (
    token,
    password
  ) => {
    const response = await axios.post(
      `${API_URL}/reset-password/${token}`,
      { password }
    );

    return response.data;
  },
};

export default authService;