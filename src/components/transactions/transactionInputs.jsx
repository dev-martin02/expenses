import React, { useState } from "react";
export default function TransactionInputs() {
  const [selectedOption, setSelectedOption] = useState();

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <fieldset className="flex justify-center gap-4 px-3 py-2 border border-gray-300 rounded-lg shadow-md">
        <div
          className={`flex items-center p-2 border border-2 rounded-md ${
            selectedOption === "expense"
              ? "bg-red-200 border-red-500"
              : "border-gray-300"
          } hover:bg-red-100 focus-within:border-red-500 transition-colors duration-300`}
        >
          <input
            type="radio"
            id="expense"
            name="income"
            value="expense"
            required
            onChange={handleChange}
            className="hidden"
          />
          <label htmlFor="expense" className="cursor-pointer">
            Expense
          </label>
        </div>

        <div
          className={`flex items-center p-2 border border-2 rounded-md ${
            selectedOption === "income"
              ? "bg-green-200 border-green-500"
              : "border-gray-300"
          } hover:bg-green-100 focus-within:border-green-500 transition-colors duration-300`}
        >
          <input
            type="radio"
            id="income"
            name="income"
            value="income"
            required
            onChange={handleChange}
            className="hidden"
          />
          <label htmlFor="income" className="cursor-pointer">
            Income
          </label>
        </div>

        <div
          className={`flex items-center p-2 border border-2 rounded-md ${
            selectedOption === "investment"
              ? "bg-yellow-200 border-yellow-500"
              : "border-gray-300"
          } hover:bg-yellow-100 focus-within:border-yellow-500 transition-colors duration-300`}
        >
          <input
            type="radio"
            id="investment"
            name="income"
            value="investment"
            required
            onChange={handleChange}
            className="hidden"
          />
          <label htmlFor="investment" className="cursor-pointer">
            Investment
          </label>
        </div>
      </fieldset>

      <label htmlFor="date" className="w-80">
        Date
        <input
          type="date"
          name="date"
          id="date"
          className="input input-bordered input-xs w-full max-w-xs"
          required
        />
      </label>

      <label htmlFor="expenseName" className="w-80">
        Name
        <input
          type="text"
          name="expenseName"
          id="expenseName"
          className="input input-bordered input-xs w-full max-w-xs"
          required
        />
      </label>

      <label htmlFor="description" className="w-80">
        Description
        <input
          type="text"
          name="description"
          id="description"
          className="input input-bordered input-xs w-full max-w-xs"
          required
        />
      </label>

      <button type="submit" className="btn btn-success text-white w-80">
        Add Transaction
      </button>
    </>
  );
}
