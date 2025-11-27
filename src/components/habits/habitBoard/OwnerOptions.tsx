import { Button } from "@/components/ui/button";
import React from "react";

const OwnerOptions = () => {
  return (
    <div className="flex gap-2 p-2">
      <Button variant="outline">Manage Notes</Button>
      <Button variant="outline">View Options(List/Favorites/Private)</Button>
      {/* <Button variant="outline">View Private Notes</Button> */}
      <Button variant="outline">Share</Button>
    </div>
  );
};

export default OwnerOptions;
