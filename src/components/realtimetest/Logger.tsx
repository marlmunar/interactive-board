"use client";
import { getChannel } from "@/lib/db/channelRegistry";
import { useAppDispatch } from "@/store/hooks";
import {
  createPageChannel,
  removePageChannel,
} from "@/store/slices/channel/channelSlice";
import { channel } from "diagnostics_channel";
import { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
}

interface LoggerProps {
  user: User;
  habitId: string;
}

export function Logger({ user, habitId }: LoggerProps) {
  const dispatch = useAppDispatch();
  const [logs, setLogs] = useState<string[]>([]);

  // Add a log message
  const addLog = (msg: string, time: Date = new Date()) => {
    setLogs((prev) => [
      ...prev,
      `${new Date(time).toLocaleTimeString()} — ${msg}`,
    ]);
  };

  useEffect(() => {
    // 1️⃣ Create the page channel (via Redux thunk)
    dispatch(createPageChannel({ pageId: habitId, user }));

    // 2️⃣ Grab the channel from registry
    let channel = getChannel(habitId);

    // 3️⃣ Function to attach listeners (safe even if channel not ready immediately)
    const attachListeners = () => {
      if (!channel) return;

      // Listen to broadcast events
      channel.on("broadcast", { event: "ping" }, (payload) =>
        console.log(payload)
      );

      // Optional: presence events
      channel.on("presence", { event: "join" }, ({ newPresences }) => {
        newPresences.forEach((meta: any) => {
          if (meta.username) {
            addLog(
              `${meta.username} joined the page.`,
              meta.online_at || new Date()
            );
          }
        });
      });

      channel.on("presence", { event: "leave" }, ({ leftPresences }) => {
        leftPresences.forEach((meta: any) => {
          if (meta.username) {
            addLog(
              `${meta.username} left the page.`,
              meta.online_at || new Date()
            );
          }
        });
      });

      channel.subscribe((status) => {
        if (status === "SUBSCRIBED") {
          channel.track({ username: user.username, onLine_at: new Date() });
        }
      });
    };

    attachListeners();

    return () => {
      channel.untrack();
    };
  }, [dispatch, habitId, user]);

  return (
    <div className="bg-white w-full p-4 max-h-[50%] rounded m-2 overflow-y-auto">
      <div className="flex justify-between mb-2">
        <div className="font-semibold text-lg">Page Logs</div>
        <div className="font-semibold text-sm">
          Status: {getChannel(habitId) ? "Active" : "Inactive"}
        </div>
      </div>

      <div className="space-y-1">
        {logs.map((log, i) => (
          <div key={i} className="text-sm text-gray-700">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
