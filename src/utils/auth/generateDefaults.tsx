import { AuthMap } from "@/schemas/auth";

const defaultValuesMap = {
  signin: {
    email: "",
    password: "",
  },
  signup: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
} satisfies { [K in keyof AuthMap]: Partial<AuthMap[K]> };

const getDefaultValues = <T extends keyof AuthMap>(
  type: T
): Partial<AuthMap[T]> => defaultValuesMap[type];

export default getDefaultValues;
