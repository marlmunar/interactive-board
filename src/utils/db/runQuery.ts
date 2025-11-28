import { BadRequestError, NotFoundError } from "@/lib/error/apiError";
import { Prisma } from "@/generated/prisma/client";

export const runQuery = async <T>(
  query: () => Promise<T>,
  resourceType: string,
  resourceData: Record<string, unknown>
) => {
  try {
    return await query();
  } catch (error) {
    const identifiersStr = Object.entries(resourceData)
      .map(([key, val]) => `${key}: ${val}`)
      .join(", ");

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2025":
          throw new NotFoundError(
            `${resourceType} with idenfitier/s {${identifiersStr}} cannot be found or does not exist.`
          );
        case "P2002":
          throw new BadRequestError(
            `${resourceType} with idenfitier/s {${identifiersStr}} already exists.`
          );
      }
    }
    throw error;
  }
};
