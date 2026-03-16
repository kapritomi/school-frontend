export type TaskType = "pair" | "grouping" | "assignment" | "short";

export type SidebarItem = { id: string; label: string; type: TaskType };
export type Slot = SidebarItem | null;

// ---- JSON struktúra (a képed alapján) ----
// ---- Assignment ----
export type Answer = { 
  answer: string; 
  isCorrect: boolean 
};
export type CoordinateAndAnswers = { 
  coordinate: string; 
  answers: Answer[] 
};
export type AssignmentJson = {
  image: string;
  coordinatesAndAnswers: CoordinateAndAnswers[];
};

// ---- Short Answer ----
export type ShortQuestion = {
  question: string;
  answer: string;
};

export type ShortAnswerJson = {
  questions: ShortQuestion[];
}

// ---- Grouping ----
export type Group ={

}

export type TaskJson = {
  id: string; // belső azonosító
  task_title: string;
  task_description: string;
  task_type_id: number;
  assignment?: AssignmentJson;
  short_answer?: ShortAnswerJson;
};


export type TasksJson = {
  tasks: TaskJson[];
};

export const MAX_ITEMS = 10;

export const TASK_TYPE_ID: Record<TaskType, number> = {
  pair: 1,
  grouping: 2,
  short: 3,
  assignment: 4,
};