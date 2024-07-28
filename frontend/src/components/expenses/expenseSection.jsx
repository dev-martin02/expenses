import ExpenseCard from "./expenseCard";
import { userStore } from "../../store/userStore";
import { useEffect, useState } from "react";

export default function ExpenseSection() {
  const { expenses } = userStore();
  const [newArr, setNewArr] = useState([]);

  useEffect(() => {
    const limit = Math.min(expenses.length, 8);
    const startIndex = expenses.length - 1;
    const reversedExpenses = [];

    for (let i = 0; i < limit; i++) {
      reversedExpenses.push(expenses[startIndex - i]);
    }

    setNewArr(reversedExpenses);
  }, [expenses]);

  return (
    <main className="sm:w-96">
      <div className="flex w-full justify-between align-middle mb-3">
        <h2 className="font-bold text-lg">All Expenses</h2>
        <button className="btn btn-sm">View All</button>
      </div>

      <section className="flex flex-col gap-4">
        {newArr.map(({ amount, date, expenseName, description, _id }) => (
          <ExpenseCard
            key={_id}
            amount={amount}
            date={date}
            name={expenseName}
            description={description}
          />
        ))}
      </section>
    </main>
  );
}
