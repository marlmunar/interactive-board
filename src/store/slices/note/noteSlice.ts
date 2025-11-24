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
    addOneNote: (state, action) => {
      state.notes.push(action.payload);
    },
    removeOneNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const { setNewNoteData, setNotes, addOneNote, removeOneNote } =
  noteSlice.actions;
export default noteSlice.reducer;
