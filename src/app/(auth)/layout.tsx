import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full p-2">
      <h1 className="h3">Habit Patch</h1>
      <div className="center flex-col border-2">{children}</div>
    </div>
  );
};

export default AuthLayout;
