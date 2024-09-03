//Access the backend
const url = "https://expensesapi-lm0q.onrender.com";
// const url = "http://localhost:3000";

export const loginUser = async (formContent) => {
  try {
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
  } catch (e) {
    console.log(e.message);
  }
};

export const createUser = async (userData) => {
  const response = await fetch(`${url}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "An error occurred during sign up");
  }

  return data;
};
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
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formContent),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const showExpense = async () => {
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
