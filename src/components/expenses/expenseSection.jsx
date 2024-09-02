import ExpenseCard from "./expenseCard";
import { userStore } from "../../store/userStore";
import { useEffect, useState } from "react";

export default function ExpenseSection() {
  const { expenses } = userStore();
  const [newExpensesArr, setNewExpensesArr] = useState([]);
  const [displayAllExpenses, setDisplayAllExpenses] = useState(false);

  const [sectionTitle, setSectionTitle] = useState("Expenses");
  const expensesPerPage = 4;

  function toggleSection() {
    if (displayAllExpenses) {
      setDisplayAllExpenses(!displayAllExpenses);
      setSectionTitle("Expenses");
      return;
    }

    setDisplayAllExpenses(true);
    setSectionTitle("All Expenses");
  }

  let idCounter = 0;
  function uniqueId() {
    idCounter += 1;
    return `${Date.now}-${idCounter}`;
  }

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * expensesPerPage;
  const firstIndex = lastIndex - expensesPerPage;

  const currentExpenses = expenses.slice(firstIndex, lastIndex);

  const Pagination = () => {
    const totalPages = Math.ceil(expenses.length / expensesPerPage);
    const maxButtonsToShow = 4;

    const pageSet = Math.ceil(currentPage / maxButtonsToShow);
    const startPage = (pageSet - 1) * maxButtonsToShow + 1;
    const endPage = Math.min(startPage + maxButtonsToShow - 1, totalPages);

    const pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={` mx-1 border-2 rounded-md border-blue-500 px-1 ${
            currentPage === i ? "bg-blue-500 text-white" : ""
          }`}
        >
          {i}
        </button>
      );
    }
    return (
      <div className="pagination">
        {startPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>{"<"}</button>
        )}
        {pageButtons}
        {endPage < totalPages && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>{">"}</button>
        )}
      </div>
    );
  };

  useEffect(() => {
    const limit = Math.min(expenses.length, 4);
    const startIndex = expenses.length - 1;
    const reversedExpenses = [];

    for (let i = 0; i < limit; i++) {
      reversedExpenses.push(expenses[startIndex - i]);
    }
    setNewExpensesArr(reversedExpenses);
  }, [expenses]);

  return (
    <main className="sm:w-96">
      <div className="flex w-full justify-between align-middle mb-3">
        <h2 className="font-bold text-lg">{sectionTitle}</h2>
        <button className="btn btn-sm" onClick={toggleSection}>
          {displayAllExpenses ? "Latest Expenses" : "View All"}
        </button>
      </div>

      <section className="flex flex-col gap-4">
        {displayAllExpenses ? (
          <>
            {currentExpenses.map(
              ({ amount, date, expenseName, description }) => (
                <ExpenseCard
                  key={uniqueId()}
                  amount={amount}
                  date={date}
                  name={expenseName}
                  description={description}
                />
              )
            )}
            <Pagination />
          </>
        ) : (
          newExpensesArr.map(({ amount, date, expenseName, description }) => (
            <ExpenseCard
              key={uniqueId()}
              amount={amount}
              date={date}
              name={expenseName}
              description={description}
            />
          ))
        )}
      </section>
    </main>
  );
}
