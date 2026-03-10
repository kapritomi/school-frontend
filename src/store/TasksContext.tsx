import React, { createContext, useContext, useMemo, useReducer } from "react";
import type { TasksAction, TasksState } from "./tasksReducer";
import { initialTasksState, tasksReducer } from "./tasksReducer";

type Ctx = {
  state: TasksState;
  dispatch: React.Dispatch<TasksAction>;
};

const TasksContext = createContext<Ctx | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(tasksReducer, initialTasksState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasksContext() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasksContext must be used inside <TasksProvider>");
  return ctx;
}