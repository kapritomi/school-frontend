import { useMemo } from "react";
import { useTasksContext } from "./TasksContext";
import type { SidebarItem, TaskJson, TaskType } from "../types/tasks";

export function useTasks() {
  const { state, dispatch } = useTasksContext();

  const activeTask = useMemo(() => {
    if (!state.activeId) return null;
    return state.tasksJson.tasks.find((t) => t.id === state.activeId) ?? null;
  }, [state.activeId, state.tasksJson.tasks]);

  return {
    slots: state.slots,
    tasksJson: state.tasksJson,
    activeId: state.activeId,
    activeTask,

    selectTask: (item: SidebarItem) => dispatch({ type: "SELECT_TASK", id: item.id }),
    createTask: (slotIndex: number, label: string, type: TaskType) =>
      dispatch({ type: "CREATE_TASK", payload: { slotIndex, label, type } }),
    removeTask: (id: string) => dispatch({ type: "REMOVE_TASK", id }),
    updateTask: (task: TaskJson) => dispatch({ type: "UPDATE_TASK", task }),
    reorderSlots: (from: number, to: number) => dispatch({ type: "REORDER_SLOTS", from, to }),
  };
}