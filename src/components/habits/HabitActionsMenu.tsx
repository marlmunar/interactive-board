"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { deleteHabit } from "@/services/api/habit/deleteHabit";
import { removeOneHabit } from "@/store/slices/habit/habitSlice";
import { useAppDispatch } from "@/store/hooks";
import DeleteItem from "../modals/DeleteItem";
import { ReqBodyHabit } from "@/types/habit";
import FormModalWrapper from "../modals/FormModalWrapper";
import EditHabitForm from "../forms/EditHabitForm";

interface HabitActionsMenuProps {
  habitId: string;
  habitData: ReqBodyHabit;
}

const HabitActionsMenu = ({ habitId, habitData }: HabitActionsMenuProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const dispatch = useAppDispatch();

  const requestDeleteHabit = async () => {
    try {
      await deleteHabit(habitId);
      dispatch(removeOneHabit(habitId));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-between w-full *:flex-1 gap-2">
      <FormModalWrapper
        trigger="Edit"
        description="This will edit a habit."
        title="Edit a habit"
      >
        {(closeDialog) => (
          <EditHabitForm
            closeDialog={closeDialog}
            habitData={habitData}
            habitId={habitId}
          />
        )}
      </FormModalWrapper>
      <Button variant="outline" onClick={() => setIsDeleting(true)}>
        Delete
      </Button>
      {isDeleting && (
        <DeleteItem
          trigger="delete"
          open={isDeleting}
          setIsOpen={setIsDeleting}
          resource={{ type: "habit" }}
          requestDelete={requestDeleteHabit}
        />
      )}
    </div>
  );
};

export default HabitActionsMenu;
