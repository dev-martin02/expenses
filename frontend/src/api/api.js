//Access the backend
const url = "http://localhost:3000";

//ADD the abort functionality to all of the routers

export const loginUser = async (formContent) => {
  const response = await fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formContent),
  });
  const data = await response.json();
  return data;
};

export const createUser = () => {};

// Logout user
export const logOutUser = async () => {
  try {
    const response = await fetch(url + "/logOut", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Logout failed");
    }
    console.log("User logged out");
  } catch (error) {
    console.error("Error:", error);
  }
};

// Add Expense
export const addUserExpense = async (formContent) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formContent),
  });
  const data = await response.json();
  console.log(data);
};

export const showExpense = async () => {
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);
  return data;
};
