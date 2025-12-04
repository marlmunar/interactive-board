import supabase from "@/lib/db/supabase";
import { useEffect, useState, useRef } from "react";

interface User {
  id: string;
  username: string;
}

interface LoggerProps {
  user: User;
  habitId: string;
}

export function Logger({ user, habitId }: LoggerProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const seenUsers = useRef<Set<string>>(new Set()); // Track already logged users

  // Helper to add log entries
  const addLog = (msg: string, time: Date) => {
    setLogs((prev) => [
      ...prev,
      `${new Date(time).toLocaleTimeString()} — ${msg}`,
    ]);
  };

  useEffect(() => {
    const channel = supabase.channel(`post-${habitId}`, {
      config: { presence: { key: user.id.toString() } },
    });

    // ---------------- PRESENCE ----------------
    // SYNC — log only users not already logged
    (channel as any).on("presence", { event: "sync" }, () => {
      const currentPresences = channel.presenceState();

      const allMetas = Object.values(currentPresences).flatMap(
        (userSessions: any) => Object.values(userSessions)
      );

      allMetas.forEach((meta: any) => {
        if (meta.username && !seenUsers.current.has(meta.username)) {
          seenUsers.current.add(meta.username);
          addLog(`${meta.username} is in the page.`, meta.time);
        }
      });
    });

    // JOIN — new users
    (channel as any).on(
      "presence",
      { event: "join" },
      ({ newPresences }: any) => {
        newPresences.forEach((meta: any) => {
          if (meta.username && !seenUsers.current.has(meta.username)) {
            seenUsers.current.add(meta.username);
            addLog(`${meta.username} joined the page.`, meta.time);
          }
        });
      }
    );

    // LEAVE — remove users from seenUsers
    (channel as any).on(
      "presence",
      { event: "leave" },
      ({ leftPresences }: any) => {
        leftPresences.forEach((meta: any) => {
          if (meta.username && seenUsers.current.has(meta.username)) {
            seenUsers.current.delete(meta.username);
            addLog(`${meta.username} left the page.`, meta.time);
          }
        });
      }
    );

    // ---------------- BROADCAST ----------------

    (channel as any).on(
      "broadcast",
      { event: "note-action" },
      ({
        payload,
      }: {
        payload: { user: User; time: Date; action: string };
      }) => {
        addLog(`${payload.user.username} ${payload.action}`, payload.time);
        console.log("hello");
      }
    );

    // Subscribe + track our presence
    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        channel.track({
          id: user.id,
          username: user.username,
          time: new Date(),
        });
      }
    });

    return () => {
      supabase.removeChannel(channel);
      seenUsers.current.clear(); // clean up
    };
  }, [habitId, user.id, user.username]);

  return (
    <div className="p-4 border rounded bg-gray-50 space-y-2">
      <h2 className="font-bold">Activity Log</h2>
      <div className="text-sm h-64 overflow-y-auto space-y-1">
        {logs.map((log, i) => (
          <div key={i} className="text-gray-700">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
