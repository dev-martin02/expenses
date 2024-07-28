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
    <section className="absolute top-0 right-0 h-96 w-56 bg-black border-2 flex flex-col justify-center items-center">
      <button
        className="text-white absolute top-2 left-3"
        onClick={() => setDisplayUserSection(false)}
      >
        X
      </button>
      <h2 className="text-white mt-10 mb-0">{`Hello ${username}`}</h2>
      <div className="flex m-0 flex-col justify-center items-center h-full">
        <button className="btn" onClick={logUserOut}>
          Log Out
        </button>
      </div>
    </section>
  );
}
