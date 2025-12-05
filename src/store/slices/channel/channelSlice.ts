// channelSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import supabase from "@/lib/db/supabase";
import {
  getChannel,
  removeChannel,
  setChannel,
} from "@/lib/db/channelRegistry";

type PresenceState = Record<string, any[]>;

interface ChannelsState {
  activePages: Record<string, boolean>;
}

interface CreateChannelArgs {
  pageId: string;
  user: { id: string; username: string };
}

const initialState: ChannelsState = {
  activePages: {},
};

export const createPageChannel = createAsyncThunk(
  "channels/create",
  async ({ pageId, user }: CreateChannelArgs, thunkAPI) => {
    const channel = supabase.channel(`channel_${pageId}`, {
      config: {
        presence: {
          key: user.id,
        },
        broadcast: { self: true },
      },
    });

    setChannel(pageId, channel);

    return pageId;
  }
);

export const removePageChannel = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("channels/remove", async (pageId, thunkAPI) => {
  const channel = getChannel(pageId);
  if (channel) {
    await channel.unsubscribe();
    console.log("remove channel");

    removeChannel(pageId);
  }
  return pageId;
});

export const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    // updatePresences: (state, action) => {
    //   state.presences[action.payload.pageId] = action.payload.presence;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPageChannel.fulfilled, (state, action) => {
        state.activePages[action.payload] = true;
      })
      .addCase(removePageChannel.fulfilled, (state, action) => {
        delete state.activePages[action.payload];
      });
  },
});

// export const {  } = channelSlice.actions;
export default channelSlice.reducer;
