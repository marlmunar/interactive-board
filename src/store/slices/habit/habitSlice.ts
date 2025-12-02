import { Author, blankAuthor } from "@/types/author";
import { blankHabit, Habit } from "@/types/habit";
import { createSlice } from "@reduxjs/toolkit";

interface HabitSliceState {
  habitAuthor: Author;
  habits: Habit[];
  habitData: Habit;
}

const initialState: HabitSliceState = {
  habitAuthor: blankAuthor,
  habits: [],
  habitData: blankHabit,
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
    setHabitData: (state, action) => {
      state.habitData = action.payload;
    },
    toggleIsLikedHabit: (state) => {
      const habit = { ...state.habitData };
      state.habitData = {
        ...habit,
        interactionStats: {
          ...habit.interactionStats,
          likeCount: habit.interactionStats.isLikedByCurrentUser
            ? habit.interactionStats.likeCount - 1
            : habit.interactionStats.likeCount + 1,
          isLikedByCurrentUser: !habit.interactionStats.isLikedByCurrentUser,
        },
      };
    },
    toggleIsFollowedHabit: (state) => {
      const habit = { ...state.habitData };
      state.habitData = {
        ...habit,
        interactionStats: {
          ...habit.interactionStats,
          followCount: habit.interactionStats.isFollowedByCurrentUser
            ? habit.interactionStats.followCount - 1
            : habit.interactionStats.followCount + 1,
          isFollowedByCurrentUser:
            !habit.interactionStats.isFollowedByCurrentUser,
        },
      };
    },
    incNoteCount: (state) => {
      const habit = { ...state.habitData };
      state.habitData = {
        ...habit,
        interactionStats: {
          ...habit.interactionStats,
          noteCount: habit.interactionStats.noteCount + 1,
        },
      };
    },
    decNoteCount: (state) => {
      const habit = { ...state.habitData };
      state.habitData = {
        ...habit,
        interactionStats: {
          ...habit.interactionStats,
          noteCount: habit.interactionStats.noteCount - 1,
        },
      };
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
  setHabitData,
  toggleIsLikedHabit,
  toggleIsFollowedHabit,
  incNoteCount,
  decNoteCount,
} = habitSlice.actions;
export default habitSlice.reducer;
