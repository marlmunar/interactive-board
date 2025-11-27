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
import Link from "next/link";
import { Button } from "../ui/button";
import { Habit } from "@/types/habit";
import HabitActionsMenu from "./HabitActionsMenu";

interface HabitCardProps {
  habitData: Habit;
}

const HabitCard = ({ habitData }: HabitCardProps) => {
  const { id, name, description, progress, createdAt, updatedAt } = habitData;
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <Link href={`/habits/${id}`}>{name}</Link>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <Button variant="link" asChild>
            <Link href={`/habits/${id}`}>View</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Progress</p>
        <p>{progress}</p>

        <p>Started</p>
        <p>{new Date(createdAt).toDateString()}</p>

        <p>Last Updated</p>
        <p>{new Date(updatedAt).toDateString()}</p>
      </CardContent>
      <CardFooter>
        <HabitActionsMenu habitId={id} habitData={{ name, description }} />
      </CardFooter>
    </Card>
  );
};

export default HabitCard;
