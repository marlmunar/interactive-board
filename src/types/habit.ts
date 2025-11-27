export interface Habit {
  id: string;
  name: string;
  author: {
    username: string;
    id: string;
  };
  description: string;
  progress: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReqBodyHabit {
  name: string;
  description: string;
}

export const blankHabit: Habit = {
  id: "",
  name: "",
  author: {
    username: "",
    id: "",
  },
  description: "",
  progress: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
