import { useSession } from "next-auth/react";
import React from "react";

const Credentials = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  return (
    <>
      {session && <div>You are logged in! You are {session.user.username}</div>}
    </>
  );
};

export default Credentials;
