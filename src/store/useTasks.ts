import { useMemo } from 'react';
import { useTasksContext } from './TasksContext';
import type { SidebarItem, TaskJson, TaskType } from '../types/tasks';

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

    selectTask: (item: SidebarItem) =>
      dispatch({ type: 'SELECT_TASK', id: item.id }),
    createTask: (slotIndex: number, label: string, type: TaskType) =>
<<<<<<< HEAD
    dispatch({ type: "CREATE_TASK", payload: { slotIndex, label, type } }),
    removeTask: (id: string) => dispatch({ type: "REMOVE_TASK", id }),
    updateTask: (task: TaskJson) => dispatch({ type: "UPDATE_TASK", task }),
    reorderSlots: (from: number, to: number) => dispatch({ type: "REORDER_SLOTS", from, to }),
=======
      dispatch({ type: 'CREATE_TASK', payload: { slotIndex, label, type } }),
    removeTask: (id: string) => dispatch({ type: 'REMOVE_TASK', id }),
    updateTask: (task: TaskJson) => dispatch({ type: 'UPDATE_TASK', task }),
    reorderSlots: (from: number, to: number) =>
      dispatch({ type: 'REORDER_SLOTS', from, to }),
>>>>>>> 31806afde49b6d7849fe24cb1c0150a530d04dc3
  };
}
