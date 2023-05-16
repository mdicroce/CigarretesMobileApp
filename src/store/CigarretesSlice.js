import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cigarretes: [],
  loading: false,
};

export const cigarretesSlice = createSlice({
  name: "cigarretes",
  initialState,
  reducers: {
    setCigarretes: (state, action) => {
      state.loading = false;
      state.cigarretes = action.payload;
    },
    addCigarrete: (state, action) => {
      state.loading = false;
      state.cigarretes.push(action.payload);
    },
    changeCigarrete: (state, action) => {
      const index = state.cigarretes.findIndex(
        (cigarro) => cigarro.id === action.payload.changedCigarrete.id
      );
      state.cigarretes[index] = action.payload.changedCigarrete;
    },
    cleanState: (state) => {
      state.cigarretes = [];
    },
    startLoading: (state) => {
      state.loading = true;
    },
    deleteStateCigarrete: (state, action) => {
      state.cigarretes = state.cigarretes.filter(
        (cig) => cig.id !== action.payload.id
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCigarretes,
  changeCigarrete,
  cleanState,
  startLoading,
  addCigarrete,
  deleteStateCigarrete,
} = cigarretesSlice.actions;

export default cigarretesSlice.reducer;
