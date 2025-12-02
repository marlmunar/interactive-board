"use client";

import AddNoteForm from "@/components/forms/AddNoteForm";
import FormModalWrapper from "@/components/modals/FormModalWrapper";
import { Button } from "@/components/ui/button";
import { toggleFollowedHabit } from "@/services/api/habit/toggleFollow";
import { toggleLikedHabit } from "@/services/api/habit/toggleLiked";
import { useAppDispatch } from "@/store/hooks";
import {
  toggleIsFollowedHabit,
  toggleIsLikedHabit,
} from "@/store/slices/habit/habitSlice";
import { Habit } from "@/types/habit";
import { useParams } from "next/navigation";

interface VisitorOptionsProps {
  interactionStats: Habit["interactionStats"];
}

const VisitorOptions = ({ interactionStats }: VisitorOptionsProps) => {
  const { isLikedByCurrentUser: isLiked, isFollowedByCurrentUser: isFollowed } =
    interactionStats;
  const dispatch = useAppDispatch();
  const { id: habitId } = useParams();

  const requestToggleLike = async () => {
    try {
      await toggleLikedHabit({
        habitId: habitId as string,
      });

      dispatch(toggleIsLikedHabit());
    } catch (error) {
      console.error(error);
    }
  };

  const requestToggleFollow = async () => {
    try {
      await toggleFollowedHabit({
        habitId: habitId as string,
      });

      dispatch(toggleIsFollowedHabit());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-2 p-2">
      <Button variant="outline" onClick={requestToggleLike}>
        {isLiked ? "Liked" : "Like"}
      </Button>
      <Button variant="outline" onClick={requestToggleFollow}>
        {isFollowed ? "Followed" : "Follow/Notify Me"}
      </Button>
      <FormModalWrapper
        trigger="Post a Note"
        description="This will create a note."
        title="Add a note"
      >
        {(closeDialog) => <AddNoteForm closeDialog={closeDialog} />}
      </FormModalWrapper>
      <Button variant="outline">Share</Button>
    </div>
  );
};

export default VisitorOptions;
