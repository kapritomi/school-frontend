import type { Slot, TaskJson, TasksJson, TaskType } from "../types/tasks";
import { MAX_ITEMS, TASK_TYPE_ID } from "../types/tasks";

export type TasksState = {
  slots: Slot[];
  tasksJson: TasksJson;
  activeId: string | null;
  nextId: number;
};

type CreatePayload = { slotIndex: number; label: string; type: TaskType };

export type TasksAction =
  | { type: "SELECT_TASK"; id: string }
  | { type: "CREATE_TASK"; payload: CreatePayload }
  | { type: "REMOVE_TASK"; id: string }
  | { type: "UPDATE_TASK"; task: TaskJson }
  | { type: "REORDER_SLOTS"; from: number; to: number };

export const initialTasksState: TasksState = {
  nextId: 3,
  slots: (() => {
    const initial: Slot[] = Array(MAX_ITEMS).fill(null);
    initial[0] = { id: "1", label: "Párkereső", type: "pair" };
    initial[1] = { id: "2", label: "Madarak", type: "short" };
    return initial;
  })(),
  tasksJson: {
    tasks: [
      {
        id: "1",
        task_title: "Párkereső",
        task_description: "",
        task_type_id: TASK_TYPE_ID.pair,
      },
      {
        id: "2",
        task_title: "Madarak",
        task_description: "",
        task_type_id: TASK_TYPE_ID.short,
      },
    ],
  },
  activeId: null,
};

function swap<T>(arr: T[], i: number, j: number) {
  const copy = arr.slice();
  [copy[i], copy[j]] = [copy[j], copy[i]];
  return copy;
}

export function tasksReducer(state: TasksState, action: TasksAction): TasksState {
  switch (action.type) {
    case "SELECT_TASK":
      return { ...state, activeId: action.id };

    case "CREATE_TASK": {
      const { slotIndex, label, type } = action.payload;
      const id = String(state.nextId);

      // slotok
      const slots = state.slots.slice();
      if (slots[slotIndex] !== null) return state; // közben betelt
      slots[slotIndex] = { id, label, type };

      // task JSON
      const base: TaskJson = {
        id,
        task_title: label,
        task_description: "",
        task_type_id: TASK_TYPE_ID[type],
      };

      const task =
        type === "assignment"
          ? {
              ...base,
              assignment: { image: "", coordinatesAndAnswers: [] },
            }
          : 
        type === "short"
        ? {
            ...base,
            short_answer: {
            questions: [],
            },
          }
        :base;

      return {
        ...state,
        nextId: state.nextId + 1,
        slots,
        tasksJson: { tasks: [...state.tasksJson.tasks, task] },
        activeId: id,
      };
    }

    case "REMOVE_TASK": {
      const removedId = action.id;

      const slots = state.slots.map((s) => (s?.id === removedId ? null : s));
      const tasks = state.tasksJson.tasks.filter((t) => t.id !== removedId);

      return {
        ...state,
        slots,
        tasksJson: { tasks },
        activeId: state.activeId === removedId ? null : state.activeId,
      };
    }

    case "UPDATE_TASK": {
      const next = action.task;

      // task json frissítés
      const tasks = state.tasksJson.tasks.map((t) => (t.id === next.id ? next : t));

      // sidebar label szinkron (title változás)
      const slots = state.slots.map((s) => (s?.id === next.id ? { ...s, label: next.task_title } : s));

      return { ...state, tasksJson: { tasks }, slots };
    }

    case "REORDER_SLOTS": {
     const { from, to } = action;

  if (from === to) return state;
  if (from < 0 || to < 0 || from >= state.slots.length || to >= state.slots.length) return state;
  if (state.slots[from] === null) return state;

  const newSlots = swap(state.slots, from, to);

  const taskMap = new Map(state.tasksJson.tasks.map((task) => [task.id, task]));

  const reorderedTasks = newSlots
    .filter((slot): slot is NonNullable<typeof slot> => slot !== null)
    .map((slot) => taskMap.get(slot.id))
    .filter((task): task is NonNullable<typeof task> => task !== undefined);

  return {
    ...state,
    slots: newSlots,
    tasksJson: {
      tasks: reorderedTasks,
    },
  };
    }

    default:
      return state;
  }
}