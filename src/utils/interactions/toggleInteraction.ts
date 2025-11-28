import prisma from "@/lib/db/prisma";
import { getCounterField } from "./getCounterField";
import { Habit, Note } from "@prisma/client";
import { InteractionType, ResourceType } from "@/generated/prisma/enums";

type Params = {
  userId: number;
  resourceType: ResourceType;
  resourceId: number;
  type: InteractionType;
};

const toggleInteraction = async ({
  userId,
  resourceType,
  resourceId,
  type,
}: Params) => {
  const existing = await prisma.interaction.findUnique({
    where: {
      userId_resourceType_resourceId_type: {
        userId,
        resourceType,
        resourceId,
        type,
      },
    },
  });

  const counterField = getCounterField(resourceType, type);
  console.log(counterField);

  const resourceUpdateMap = {
    [ResourceType.HABIT]: (id: number, field: keyof Habit, increment = 1) =>
      prisma.habit.update({
        where: { id },
        data: { [field]: { increment } },
      }),
    [ResourceType.NOTE]: (id: number, field: keyof Note, increment = 1) =>
      prisma.note.update({
        where: { id },
        data: { [field]: { increment } },
      }),
  } as const;

  const updateResourceCounter = resourceUpdateMap[resourceType];

  if (existing) {
    await prisma.$transaction([
      prisma.interaction.delete({
        where: {
          userId_resourceType_resourceId_type: {
            userId,
            resourceType,
            resourceId,
            type,
          },
        },
      }),
      updateResourceCounter(resourceId, counterField as any, -1),
    ]);

    return { active: false };
  }

  await prisma.$transaction([
    prisma.interaction.create({
      data: { userId, resourceType, resourceId, type },
    }),
    updateResourceCounter(resourceId, counterField as any, 1),
  ]);

  return { active: true };
};

export default toggleInteraction;
