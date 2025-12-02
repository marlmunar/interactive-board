import { blankNote, Note } from "@/types/note";
import { createSlice } from "@reduxjs/toolkit";

interface NoteSliceState {
  newNoteData: Note;
  notes: Note[];
}

const initialState: NoteSliceState = {
  newNoteData: blankNote,
  notes: [],
};

export const noteSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setNewNoteData: (state, action) => {
      state.newNoteData = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    sortNotes: (state) => {
      state.notes = state.notes.sort(
        (a: Note, b: Note) =>
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
      );
    },

    addOneNote: (state, action) => {
      state.notes.push(action.payload);
    },
    removeOneNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    updateOneNote: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id ? { ...action.payload } : note
      );
    },

    toggleIsFavorite: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload
          ? {
              ...note,
              interactionStats: {
                ...note.interactionStats,
                isFavorite: !note.interactionStats.isFavorite,
              },
            }
          : note
      );
    },
    toggleIsLiked: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload
          ? {
              ...note,
              interactionStats: {
                ...note.interactionStats,
                likeCount: note.interactionStats.isLikedByCurrentUser
                  ? note.interactionStats.likeCount - 1
                  : note.interactionStats.likeCount + 1,
                isLikedByCurrentUser:
                  !note.interactionStats.isLikedByCurrentUser,
              },
            }
          : note
      );
    },
  },
});

export const {
  setNewNoteData,
  setNotes,
  sortNotes,
  addOneNote,
  removeOneNote,
  toggleIsFavorite,
  toggleIsLiked,
} = noteSlice.actions;
export default noteSlice.reducer;
