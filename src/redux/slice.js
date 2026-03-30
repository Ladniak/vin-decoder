import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "history",
  initialState: {
    items: JSON.parse(localStorage.getItem("vinHistory")) || [],
  },
  reducers: {
    addToHistory: (state, action) => {
      const newVin = action.payload.toUpperCase();
      state.items = [newVin, ...state.items.filter((v) => v !== newVin)].slice(
        0,
        3,
      );
      localStorage.setItem("vinHistory", JSON.stringify(state.items));
    },
  },
});

export const { addToHistory } = historySlice.actions;
export default historySlice.reducer;
