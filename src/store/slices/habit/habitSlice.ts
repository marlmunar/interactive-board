import { Author, blankAuthor } from "@/types/author";
import {} from "@/types/note";
import { createSlice } from "@reduxjs/toolkit";

interface HabitSliceState {
  habitAuthor: Author;
}

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
