"use client";

import React from "react";
import { SessionProvider, useSession } from "next-auth/react";
import Credentials from "@/components/Credentials";

const Home = () => {
  return (
    <>
      <div className="center text-secondary h1 h-full">
        Habit Patch: Where good habits grow, one day at a time.
      </div>
      <SessionProvider>
        <Credentials />
      </SessionProvider>
    </>
  );
};

export default Home;
