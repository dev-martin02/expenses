export default function TransactionInputs() {
  return (
    <>
      <fieldset className="flex gap-3">
        <div>
          <label htmlFor="expense">
            <input
              type="radio"
              id="expense"
              name="income"
              value="expense"
              required
            />
            expense
          </label>
        </div>

        <div>
          <label htmlFor="income">
            <input
              type="radio"
              id="income"
              name="income"
              value="income"
              required
            />
            income
          </label>
        </div>

        <div>
          <label htmlFor="investment">
            <input
              type="radio"
              id="investment"
              name="income"
              value="investment"
            />
            investment
          </label>
        </div>
      </fieldset>

      <label htmlFor="date">Date</label>
      <input
        type="date"
        name="date"
        id="date"
        className="input input-bordered input-xs w-full max-w-xs"
        required
      />
      <label htmlFor="expenseName">Name</label>
      <input
        type="text"
        name="expenseName"
        id="expenseName"
        className="input input-bordered input-xs w-full max-w-xs"
        required
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        className="input input-bordered input-xs w-full max-w-xs"
        required
      />
      <button type="submit" className="btn btn-success text-white">
        Add Transaction
      </button>
    </>
  );
}
