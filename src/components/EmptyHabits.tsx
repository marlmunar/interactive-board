import React from "react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const EmptyHabits = () => {
  return (
    <Empty
      className="from-muted/50 to-background bg-gradient-to-b from-30% w-full h-full 
        flex justify-center
        items-center"
    >
      <EmptyHeader>
        {/* <EmptyMedia variant="icon"></EmptyMedia> */}
        <EmptyTitle>Nothing Here Yet</EmptyTitle>
        <EmptyDescription>
          Your journey begins by creating a new habit.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyHabits;
