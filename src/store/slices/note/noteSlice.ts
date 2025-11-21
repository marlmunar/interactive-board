import { blankNote, Note } from "@/types/note";
import { createSlice } from "@reduxjs/toolkit";

interface NoteSliceState {
  newNoteData: Note;
}

const initialState: NoteSliceState = {
  newNoteData: blankNote,
};

export const noteSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setNewNoteData: (state, action) => {
      state.newNoteData = action.payload;
    },
  },
});

export const { setNewNoteData } = noteSlice.actions;
export default noteSlice.reducer;
