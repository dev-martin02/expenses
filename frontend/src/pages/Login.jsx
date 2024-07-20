import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import { userStore } from "../store/userStore";
export default function Login() {
  const { setUsername } = userStore();
  const navigate = useNavigate();

  async function getFormData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    let userObj = {};
    for (const data of formData.entries()) {
      userObj[data[0]] = data[1];
    }

    const { username } = await loginUser(userObj);
    setUsername(username);
    navigate("/");
  }

  return (
    <>
      <section className="flex justify-center items-center h-screen ">
        <main className="rounded ring-slate-600 ring-2 flex flex-col justify-center items-center w-80 p-3 sm:w-96 sm:p-0">
          <h1>Login Page!</h1>
          <form
            action="#"
            className="flex flex-col w-96 h-80 justify-center items-center gap-4"
            onSubmit={getFormData}
          >
            <label className="input w-72 input-bordered flex items-center gap-2 sm:w-80">
              Email
              <input
                type="email"
                className="grow"
                placeholder="Please Write your email"
                name="email"
                required
              />
            </label>
            <label className="input w-72 input-bordered flex items-center gap-2 sm:w-80">
              Password
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
          <p>
            Don't have an account yet?
            <Link to="/signUp" className=" text-yellow-800">
              Sign Up
            </Link>
            for free!!
          </p>
        </main>
      </section>
    </>
  );
}
