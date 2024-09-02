import { userStore } from "../../store/userStore";
import { logOutUser } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function LoginSection({ setDisplayUserSection }) {
  const { username } = userStore();
  const navigate = useNavigate();

  function logUserOut() {
    logOutUser();
    navigate("/login");
  }
  return (
    <section className="absolute top-0 right-0 h-96 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg flex flex-col p-4">
      <button
        className="text-gray-400 hover:text-white transition absolute top-3 right-3"
        onClick={() => setDisplayUserSection(false)}
        aria-label="Close"
      >
        &times;
      </button>
      <h2 className="text-white text-lg font-semibold mt-12 mb-4">{`Hello, ${username}`}</h2>
      <div className="flex flex-col justify-center items-center flex-grow">
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          onClick={logUserOut}
        >
          Log Out
        </button>
      </div>
    </section>
  );
}
