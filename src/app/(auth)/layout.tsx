import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full p-2">
      <h1 className="h3">Habit Patch</h1>
      <div className="max-h-full center flex-col border-2"></div>
    </div>
  );
};

export default AuthLayout;
