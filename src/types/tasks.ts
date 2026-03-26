export type TaskType = 'pair' | 'grouping' | 'assignment' | 'short';

export type SidebarItem = { id: string; label: string; type: TaskType };
export type Slot = SidebarItem | null;

// ---- JSON struktúra (a képed alapján) ----

// ---- Assignment ----
export type Answer = {
  answer: string;
  isCorrect: boolean;
};
export type CoordinateAndAnswers = {
  coordinate: string;
  answers: Answer[];
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
};

<<<<<<< HEAD
// ---- Pairing ----
export type PairGroup = {
  pair_question: string;
  pair_answer: string;
};
export type PairingJson = {
  pairing_groups: PairGroup[];
};

// ---- Grouping ---- 
export type GroupItem = {
  name: string;
};
export type Group = {
  name: string;
  items: GroupItem[];
};
export type GroupingJson = {
  groups: Group[];
};
=======
// ---- Grouping ----
export type Group = {};
>>>>>>> 31806afde49b6d7849fe24cb1c0150a530d04dc3

export type TaskJson = {
  id: string; // belső azonosító
  task_title: string;
  task_description: string;
  task_type_id: number;
  assignment?: AssignmentJson;
  short_answer?: ShortAnswerJson;
  pairing?: PairingJson;
  grouping?: GroupingJson;
};

export type TasksJson = {
  tasks: TaskJson[];
};

export const MAX_ITEMS = 10;

export const TASK_TYPE_ID: Record<TaskType, number> = {
<<<<<<< HEAD
  grouping: 1,
  pair: 2,
  assignment: 3,
  short: 4,
};
=======
  pair: 1,
  grouping: 2,
  short: 3,
  assignment: 4,
};
>>>>>>> 31806afde49b6d7849fe24cb1c0150a530d04dc3
