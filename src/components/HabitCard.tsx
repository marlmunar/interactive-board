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
import { Button } from "./ui/button";

interface HabitCardProps {
  id: string;
  name: string;
  description: string;
  progress: string;
  createdAt: Date;
}

const HabitCard = ({
  id,
  name,
  description,
  progress,
  createdAt,
}: HabitCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <Link href={`/habit/${id}`}>{name}</Link>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <Button variant="link" asChild>
            <Link href={`/habit/${id}`}>View</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Progress</p>
        <p>{progress}</p>

        <p>Started</p>
        <p>{new Date(createdAt).toDateString()}</p>
      </CardContent>
      <CardFooter className="flex gap-2 justify-between">
        <Button variant="outline" className="w-[49%]">
          Edit
        </Button>
        <Button variant="outline" className="w-[49%]">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HabitCard;
