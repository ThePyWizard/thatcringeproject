export interface LoveResume {
  username: string;
  name: string;
  age: number;
  relationshipStatus: string;
  pastRelationships: number;
  noRelationshipReason?: string;
  lastBreakupReason?: string;
  redFlags: string[];
  greenFlags: string[];
  expectations: string;
  idealDate: string;
}

export interface User {
  username: string;
  isLoggedIn: boolean;
}

export interface QuizData {
  id: string;
  user1: string;
  user2?: string;
  answers1: Record<string, string>;
  answers2?: Record<string, string>;
  compatibility?: number;
}