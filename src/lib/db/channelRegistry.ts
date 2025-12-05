import { RealtimeChannel } from "@supabase/supabase-js";

const channelRegistry: Record<string, RealtimeChannel> = {};

export const setChannel = (pageId: string, channel: RealtimeChannel) => {
  channelRegistry[pageId] = channel;
};

export const getChannel = (pageId: string) => {
  return channelRegistry[pageId];
};

export const removeChannel = (pageId: string) => {
  delete channelRegistry[pageId];
};
