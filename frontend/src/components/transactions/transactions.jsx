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

  const handleForm = (e) => {
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
    console.log(income);
    if (income === "expense" || income === "investment") {
      newAmount = moneyAmountLeft - amountNumber;
    } else {
      newAmount = moneyAmountLeft + amountNumber;
    }

    addExpense(obj);
    setMoneyAmountLeft(newAmount);
    addUserExpense(obj);
  };

  // if screen size == desktop size make the display be true and disappear the X button
  const width = useWindowWidth();
  useEffect(() => {
    console.log(width);
    if (width < 640) {
      setDeskMode(false);
    } else {
      setDisplay(true);
      setDeskMode(true);
    }
  }, [width]);
  console.log(deskMode);
  return (
    <>
      {display && (
        <section className="flex flex-col mt-3 gap-6 sm:w-96 sm:mt-0 ">
          <header className="w-full flex">
            {!deskMode && (
              <button
                onClick={() => setDisplay(false)}
                className={`relative left-1 btn btn-xs`}
              >
                X
              </button>
            )}
            <span className="mx-auto">New Transaction</span>
          </header>
          <main>
            <form
              action="#"
              onSubmit={handleForm}
              className="flex flex-col p-3 pt-0 gap-2"
            >
              <div className="flex justify-center w-full text-4xl">
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
