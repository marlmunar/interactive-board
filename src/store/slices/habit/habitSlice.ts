import { Author, blankAuthor } from "@/types/author";
import { Habit } from "@/types/habit";
import {} from "@/types/habit";
import { createSlice } from "@reduxjs/toolkit";

interface HabitSliceState {
  habitAuthor: Author;
  habits: Habit[];
}

const initialState: HabitSliceState = {
  habitAuthor: blankAuthor,
  habits: [],
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
    setHabits: (state, action) => {
      state.habits = action.payload;
    },

    addOneHabit: (state, action) => {
      state.habits.push(action.payload);
    },
    removeOneHabit: (state, action) => {
      state.habits = state.habits.filter(
        (habit) => habit.id !== action.payload
      );
    },
    updateOneHabit: (state, action) => {
      state.habits = state.habits.map((habit) =>
        habit.id === action.payload.id ? { ...action.payload } : habit
      );
    },
    sortHabits: (state) => {
      state.habits = state.habits.sort(
        (a: Habit, b: Habit) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    },
  },
});

export const {
  setHabitAuthor,
  resetHabitAuthor,
  setHabits,
  addOneHabit,
  removeOneHabit,
  updateOneHabit,
  sortHabits,
} = habitSlice.actions;
export default habitSlice.reducer;
