export default function ExpenseCard({ date, name, amount, description }) {
  const dateObj = new Date(date);
  const formatDate = dateObj.toLocaleDateString();

  return (
    <>
      {/* Day + Expenses */}
      <div>
        <h3 className="text-xs text-gray-400 font-bold mb-2">{formatDate}</h3>

        {/* Expenses Card */}
        <div className="flex items-center justify-between p-2 border-2  rounded-lg">
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-xs">{description}</p>
          </div>
          {/* money Amount */}
          <span>${amount}</span>
        </div>
      </div>
    </>
  );
}
