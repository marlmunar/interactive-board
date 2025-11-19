import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/ui/uiReducer";
import noteReducer from "./slices/notes/noteSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    note: noteReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
