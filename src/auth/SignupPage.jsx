import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../config";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((fd) => ({ ...fd, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/v1/auth/signup`, formData);
      console.log("Signup success:", response.data);
      alert("User registered successfully!");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-8 border border-yellow-400">
        <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">
          Create Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-yellow-300"
            >
              name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-yellow-400 rounded-lg bg-black text-yellow-100 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              placeholder="Enter name"
            />
          </div>

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
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-yellow-200">
          Already have an account?{" "}
          <a href="/login" className="text-yellow-400 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
