import { InteractionType, ResourceType } from "@/generated/prisma/enums";

const counterMapping: Record<ResourceType, Record<InteractionType, string>> = {
  [ResourceType.HABIT]: {
    [InteractionType.LIKE]: "likeCount",
    [InteractionType.FOLLOW]: "followCount",
    [InteractionType.FAVORITE]: "",
  },
  [ResourceType.NOTE]: {
    [InteractionType.LIKE]: "likeCount",
    [InteractionType.FOLLOW]: "",
    [InteractionType.FAVORITE]: "favoriteCount",
  },
} as const;

export const getCounterField = (
  resourceType: ResourceType,
  interactionType: InteractionType
): string => {
  const resourceMapping = counterMapping[resourceType];
  if (!resourceMapping) {
    throw new Error(`No mapping for resourceType=${resourceType}`);
  }
  const field = counterMapping[resourceType]?.[interactionType];
  if (!field) {
    throw new Error(
      `No counter field defined for resourceType=${resourceType} interactionType=${interactionType}`
    );
  }
  return field;
};
