import { useEffect, useState } from "react";
import { userStore } from "../../store/userStore";
import TransactionInputs from "./transactionInputs";
import { addUserExpense } from "../../api/api";
import { useWindowWidth } from "../../util/hooks";

export default function Transactions({ display, setDisplay }) {
  const {
    addExpense,
    moneyAmountLeft,
    setMoneyAmountLeft,
    deskMode,
    setDeskMode,
  } = userStore();
  const [transactionAmount, setTransactionAmount] = useState("");
  const [inputWidth, setInputWidth] = useState("40px");

  //Update the width of the Amount input && handle some basic error
  const updateTransactionAmount = (e) => {
    const amount = Number(e);
    //dynamic input logic
    if (amount >= 0) {
      const length = e.length;
      if (length < 15) {
        setTransactionAmount(e);
        const newWidth = length > 1 ? `${length * 20}px` : "40px";
        setInputWidth(newWidth);
      } else {
        alert("amount is too large please reduce it!");
      }
    } else {
      alert("Please type a number");
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();

    // Create FormData object and extract date
    const data = new FormData(e.target);
    const dateString = data.get("date");

    //Create and format date
    const dateObj = new Date(dateString);
    const dateFormat = dateObj.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    //Update form's date value
    data.append("date", dateFormat);

    // Create an obj and send it to the store
    let obj = {};
    for (const pair of data.entries()) {
      obj[pair[0]] = pair[1];
    }
    const { income, amount } = obj;
    const amountNumber = Number(amount);
    let newAmount;
    if (income === "expense" || income === "investment") {
      newAmount = moneyAmountLeft - amountNumber;
    } else {
      newAmount = moneyAmountLeft + amountNumber;
    }

    await addUserExpense(obj);
    addExpense(obj);
    setMoneyAmountLeft(newAmount);
  };

  const width = useWindowWidth();
  useEffect(() => {
    if (width < 640) {
      setDeskMode(false);
    } else {
      setDisplay(true);
      setDeskMode(true);
    }
  }, [width]);
  return (
    <>
      {display && (
        <section className="absolute flex flex-col items-center inset-0 backdrop-blur-sm mt-3 gap-6 sm:relative sm:backdrop-blur-none sm:w-96 sm:mt-0 ">
          <header className="w-full flex">
            {!deskMode && (
              <button
                onClick={() => setDisplay(false)}
                className={`absolute left-1 btn btn-xs w-10 bg-red-400`}
              >
                X
              </button>
            )}
            <span className="mx-auto text-2xl font-bold text-gray-900">
              New Transaction
            </span>
          </header>
          <main className="bg-white w-11/12 p-4 border-solid border-2 border-black rounded-md sm:w-96 ">
            <form
              action="#"
              onSubmit={handleForm}
              className="flex flex-col justify-center items-center p-3 pt-0 gap-2"
            >
              <div className="flex justify-center w-full text-4xl my-3 sm:m-0">
                <label htmlFor="amount">$</label>
                <input
                  type="text"
                  value={transactionAmount}
                  placeholder="00.00"
                  onChange={(e) => updateTransactionAmount(e.target.value)}
                  name="amount"
                  id="amount"
                  style={{ width: inputWidth }}
                  required
                />
              </div>
              <TransactionInputs />
            </form>
          </main>
        </section>
      )}
    </>
  );
}
