import axios from "axios";
import API_BASE_URL from "../config/api";

const API_URL = `${API_BASE_URL}/api/auth`;

const authService = {
  register: async (userData) => {
    const response = await axios.post(
      `${API_URL}/register`,
      userData
    );
    return response.data;
  },

  login: async (credentials) => {
    const response = await axios.post(
      `${API_URL}/login`,
      credentials
    );

    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  }
};

export default authService;