import ExpenseSection from "../components/expenses/expenseSection";
import websiteLogo from "../assets/websiteLogo.svg";
import { useEffect, useState } from "react";
import Transactions from "../components/transactions/transactions";
import LoginSection from "../components/useInfo/LoginSection";
import { userStore } from "../store/userStore";
import { showExpense } from "../api/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [display, setDisplay] = useState(false);
  const [displayUserSection, setDisplayUserSection] = useState(false);
  const {
    moneyAmountLeft,
    username,
    setUsername,
    setExpenses,
    setMoneyAmountLeft,
    deskMode,
  } = userStore();

  function displayState() {
    setDisplay(!display);
  }

  function displayUser() {
    setDisplayUserSection(!displayUserSection);
  }

  async function fetchData() {
    const response = await showExpense();
    const moneyLeft = Number(response.moneyLeft) || 0;
    if (response.message === "Missing authentication token") return;
    setUsername(response.username);
    setExpenses(response.expenses);
    setMoneyAmountLeft(moneyLeft);
  }

  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (username !== "") {
      fetchData();
    }
    if (!username) {
      const intervalId = setInterval(() => {
        setShowAlert((prevState) => !prevState);
      }, 15000);

      return () => clearInterval(intervalId);
    }
  }, [username]);

  // set the width for moneyAmountLeft
  let newWidth = "w-72";
  const length = String(moneyAmountLeft).length;
  if (length > 8) {
    newWidth = `${length * 20}px`;
  }

  return (
    <section className="flex flex-col items-center w-full">
      {/* info Banner */}
      {showAlert && (
        <div className="toast toast-start">
          <div className="alert alert-warning">
            <span>No data would be saved until you log in!</span>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center items-center gap-3 w-11/12">
        <nav className="flex w-full justify-between p-2 md:w-12/12 xl:w-7/12">
          <div className="w-8">
            <img src={websiteLogo} alt="website Logo" />
          </div>
          {username ? (
            <button className="btn btn-xs" onClick={displayUser}>
              {username}
            </button>
          ) : (
            <Link className="btn btn-xs" to="login">
              Login
            </Link>
          )}
        </nav>

        {displayUserSection && (
          <LoginSection setDisplayUserSection={setDisplayUserSection} />
        )}

        <div
          className={`border border-black ${newWidth} mx-auto rounded-2xl text-center bg-slate-950`}
        >
          <p className="text-5xl m-5 text-white">${moneyAmountLeft}</p>
        </div>

        <div className="sm:flex sm:justify-center w-full sm:gap-2">
          <ExpenseSection />
          <Transactions display={display} setDisplay={setDisplay} />
        </div>

        {!display && !deskMode && (
          <button
            className={`btn bg-black text-white fixed bottom-5 right-4`}
            onClick={displayState}
          >
            +
          </button>
        )}
      </div>
    </section>
  );
}
