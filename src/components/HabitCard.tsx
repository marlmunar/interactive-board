import React from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface HabitCardProps {
  name: string;
  description: string;
  progress: string;
  createdAt: Date;
}

const HabitCard = ({
  name,
  description,
  progress,
  createdAt,
}: HabitCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>View</CardAction>
      </CardHeader>
      <CardContent>
        <p>Progress</p>
        <p>{progress}</p>

        <p>Started</p>
        <p>{new Date(createdAt).toDateString()}</p>
      </CardContent>
      <CardFooter>
        <p>Edit/Delete</p>
      </CardFooter>
    </Card>
  );
};

export default HabitCard;
