import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import { userStore } from "../store/userStore";
import { useState } from "react";

export default function Login() {
  const { setUsername } = userStore();
  const navigate = useNavigate();
  const { setLoading, loading } = userStore();
  const [error, setError] = useState();

  async function getFormData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    let userObj = {};
    for (const data of formData.entries()) {
      userObj[data[0]] = data[1];
    }
    setError("");
    try {
      setLoading(true);
      const response = await loginUser(userObj);
      if (response.message) {
        throw Error(response.message);
      }
      setUsername(response.username);
      navigate("/");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="flex justify-center items-center h-screen ">
        {error && (
          <div
            role="alert"
            className="alert alert-error fixed top-5 w-56 text-white"
          >
            {error}
          </div>
        )}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-50">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        <main className="rounded ring-slate-600 ring-2 flex flex-col justify-center items-center w-80 p-3 sm:w-96 sm:p-0">
          <h1 className="text-2xl font-bold mb-4">Login Page!</h1>
          <form
            action="#"
            className="flex flex-col w-96 h-80 justify-center items-center gap-4"
            onSubmit={getFormData}
          >
            <label className="input w-72 input-bordered flex items-center gap-2 sm:w-80">
              <input
                type="email"
                className="grow"
                placeholder="Please Write your email"
                name="email"
                required
              />
            </label>
            <label className="input w-72 input-bordered flex items-center gap-2 sm:w-80">
              <input
                type="password"
                className="grow"
                placeholder="Please Write your Password"
                name="password"
                required
              />
            </label>

            <button type="submit" className="btn w-20 mx-auto">
              Login!
            </button>
          </form>
          <p className="text-lg font-semibold mb-4">
            Don't have an account yet?
            <Link to="/signUp" className=" ml-1 mr-1 text-yellow-800">
              Sign Up
            </Link>
            for free!!
          </p>
        </main>
      </section>
    </>
  );
}
