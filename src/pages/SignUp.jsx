import React, { useState } from "react";
import { createUser } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const { username, email, password } = formData;
      const data = await createUser({ username, email, password });
      setSuccess(data.message);
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (success) {
    navigate("/login");
  }

  return (
    <section className="flex justify-center items-center h-screen">
      <main className="rounded ring-slate-600 ring-2 flex flex-col justify-center items-center w-80 p-3 sm:w-96 sm:h-auto sm:p-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full justify-center items-center gap-4"
        >
          <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <label className="input w-full input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label className="input w-full input-bordered flex items-center gap-2">
            <input
              type="email"
              className="grow"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="input w-full input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label className="input w-full input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="btn w-full mt-4">
            Create Account
          </button>
        </form>
      </main>
    </section>
  );
}
