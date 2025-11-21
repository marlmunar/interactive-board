export interface Habit {
  id: string;
  name: string;
  author: {
    username: string;
    id: string;
  };
  description: string;
  progress: string;
  createdAt: Date;
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
  createdAt: new Date(),
};
