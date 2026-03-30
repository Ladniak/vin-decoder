import { configureStore } from "@reduxjs/toolkit";
import { vinApi } from "./vinApi";
import historyReducer from "./slice";

export const store = configureStore({
  reducer: {
    [vinApi.reducerPath]: vinApi.reducer,
    history: historyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(vinApi.middleware),
});
