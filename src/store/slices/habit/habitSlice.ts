import {} from "@/types/note";
import { createSlice } from "@reduxjs/toolkit";

type Author = {
  id: string;
  username: string;
};

interface HabitSliceState {
  habitAuthor: Author;
}

const blankAuthor = {
  id: "",
  username: "",
};

const initialState: HabitSliceState = {
  habitAuthor: blankAuthor,
};

export const habitSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setHabitAuthor: (state, action) => {
      state.habitAuthor = action.payload;
    },
    resetHabitAuthor: (state) => {
      state.habitAuthor = blankAuthor;
    },
  },
});

export const { setHabitAuthor, resetHabitAuthor } = habitSlice.actions;
export default habitSlice.reducer;
