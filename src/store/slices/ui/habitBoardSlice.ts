import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddingNote: false,
  isPlacingNewNote: false,
};

export const habitBoardSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setIsAddingNote: (state, action) => {
      state.isAddingNote = action.payload;
    },
    setIsPlacingNewNote: (state, action) => {
      state.isPlacingNewNote = action.payload;
    },
  },
});

export const { setIsAddingNote, setIsPlacingNewNote } = habitBoardSlice.actions;
export default habitBoardSlice.reducer;
