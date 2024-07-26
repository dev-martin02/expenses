export default function SignUp() {
  return (
    <>
      <section className="flex justify-center items-center h-screen ">
        <main className="rounded ring-slate-600 ring-2 flex flex-col justify-center items-center w-80 p-3 sm:w-96 sm:h-96 sm:p-0">
          <form
            action="#"
            className="flex flex-col w-96 h-80 justify-center items-center gap-4"
          >
            <h1>Sign Up Page!</h1>
            <label className="input w-72 input-bordered flex items-center gap-2 sm:w-80">
              Username
              <input
                type="text"
                className="grow"
                placeholder="Please Write your Username"
                name="Username"
              />
            </label>

            <label className="input w-72 input-bordered flex items-center gap-2 sm:w-80">
              Email
              <input
                type="email"
                className="grow"
                placeholder="Please Write your email"
                name="email"
              />
            </label>
            <label className="input w-72 input-bordered flex items-center gap-2 sm:w-80">
              Password
              <input
                type="password"
                className="grow"
                placeholder="Please Write your Password"
                name="password"
              />
            </label>
            <label className="input w-72 input-bordered flex items-center gap-2 sm:w-80">
              Confirm Password
              <input
                type="password"
                className="grow"
                placeholder="Please re-write your Password"
              />
            </label>

            <button type="submit" className="btn w-20 mx-auto">
              Create Account
            </button>
          </form>
        </main>
      </section>
    </>
  );
}
