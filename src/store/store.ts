import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/ui/uiReducer";
import noteReducer from "./slices/note/noteSlice";
import habitReducer from "./slices/habit/habitSlice";
import channelReducer from "./slices/channel/channelSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    note: noteReducer,
    habit: habitReducer,
    channel: channelReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
