import { configureStore } from "@reduxjs/toolkit";
import cigarretesReducer from "./CigarretesSlice";

export const cigarretesStore = configureStore({
  reducer: {
    cigarrete: cigarretesReducer,
  },
});
