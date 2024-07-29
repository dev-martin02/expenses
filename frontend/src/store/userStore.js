import { create } from "zustand";

export const userStore = create((set) => ({
  username: "",
  setUsername: (name) => set({ username: name }),

  moneyAmountLeft: 0,
  //Set the money amount
  setMoneyAmountLeft: (money) => set({ moneyAmountLeft: money }),

  // User expenses
  expenses: [],
  // once we make the call to the api an retrieve the info and put it in this arr
  setExpenses: (expense) => set({ expenses: expense }),

  //Add an expense in the Frontend and send a request to the backend
  addExpense: (expense) =>
    set((state) => ({ expenses: [...state.expenses, expense] })),

  deskMode: true,
  setDeskMode: (state) => set({ deskMode: state }),

  loading: false,
  setLoading: (state) => set({ loading: state }),
}));
