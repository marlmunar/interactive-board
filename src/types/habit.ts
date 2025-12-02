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
  interactionStats: {
    likeCount: number;
    followCount: number;
    lastActivity: string;
    noteCount: number;
    isLikedByCurrentUser: boolean;
    isFollowedByCurrentUser: boolean;
  };
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
  interactionStats: {
    likeCount: 0,
    followCount: 0,
    lastActivity: new Date().toISOString(),
    noteCount: 0,
    isLikedByCurrentUser: false,
    isFollowedByCurrentUser: false,
  },
};
