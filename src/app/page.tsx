"use client";

import React from "react";

import Credentials from "@/components/Credentials";
import Navigation from "@/components/Navigation";

const Home = () => {
  return (
    <>
      <div className="center text-secondary h1 h-full">
        Habit Patch: Where good habits grow, one day at a time.
      </div>
      <Credentials />
    </>
  );
};

export default Home;
