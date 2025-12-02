import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import SignupPage from "./SignupPage";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((fd) => ({
      ...fd,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-prac-drt3.onrender.com/v1/auth/login",
        formData
      );
      console.log("Login success:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      alert("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-8 border border-yellow-400">
        <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">
          Login
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-yellow-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-yellow-400 rounded-lg bg-black text-yellow-100 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              placeholder="Enter email"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-yellow-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-yellow-400 rounded-lg bg-black text-yellow-100 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              placeholder="Enter password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
          >
            Log In
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-yellow-200">
          Don’t have an account?{" "}
          <Link to="/" className="text-yellow-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
