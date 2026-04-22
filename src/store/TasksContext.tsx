import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type {
  Slot,
  TaskJson,
  TasksJson,
  TaskType,
  SidebarItem,
} from '../types/tasks';
import { MAX_ITEMS, TASK_TYPE_ID } from '../types/tasks';
import { uploadWorksheet } from '@/api/Worksheet/uploadWorksheet';
import type { MessageType } from '@/types/messageType';

type TasksContextType = {
  slots: Slot[];
  tasksJson: TasksJson;
  activeId: string | null;
  activeTask: TaskJson | null;
  worksheetMessage: MessageType | null;
  worksheetErrors: worksheetErrors[] | null;
  selectTask: (item: SidebarItem) => void;
  createTask: (slotIndex: number, label: string, type: TaskType) => void;
  removeTask: (id: string) => void;
  updateTask: (task: TaskJson) => void;
  reorderSlots: (from: number, to: number) => void;
  saveWorksheetToDB: () => void;
  setWorksheetMessage: (message: MessageType | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};
type worksheetErrors = {
  key: string;
  message: string[];
};

const TasksContext = createContext<TasksContextType | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [slots, setSlots] = useState<Slot[]>(() => Array(MAX_ITEMS).fill(null));
  const [tasksJson, setTasksJson] = useState<TasksJson>({ tasks: [] });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [nextId, setNextId] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [worksheetMessage, setWorksheetMessage] = useState<null | MessageType>(
    null,
  );
  const [worksheetErrors, setWorksheetErrors] = useState<
    null | worksheetErrors[]
  >(null);

  const activeTask = useMemo(() => {
    if (!activeId) return null;
    return tasksJson.tasks.find((t) => t.id === activeId) ?? null;
  }, [activeId, tasksJson.tasks]);

  // -----------------------
  // ACTIONS
  // -----------------------

  const selectTask = (item: SidebarItem) => {
    setActiveId(item.id);
  };

  const createTask = (slotIndex: number, label: string, type: TaskType) => {
    const id = String(nextId);

    // SLOT
    setSlots((prev) => {
      const copy = prev.slice();
      if (copy[slotIndex] !== null) return prev;
      copy[slotIndex] = { id, label, type };
      return copy;
    });

    // TASK JSON
    const base: TaskJson = {
      id,
      task_title: label,
      task_description: '',
      task_type_id: TASK_TYPE_ID[type],
    };

    const task =
      type === 'assignment'
        ? { ...base, assignment: { image: '', coordinatesAndAnswers: [] } }
        : type === 'short'
          ? { ...base, short_answer: { questions: [] } }
          : type === 'pair'
            ? { ...base, pairing: { pairing_groups: [] } }
            : type === 'grouping'
              ? { ...base, grouping: { groups: [] } }
              : base;

    setTasksJson((prev) => ({
      tasks: [...prev.tasks, task],
    }));

    setActiveId(id);
    setNextId((n) => n + 1);
  };

  const removeTask = (id: string) => {
    setSlots((prev) => prev.map((s) => (s?.id === id ? null : s)));

    setTasksJson((prev) => ({
      tasks: prev.tasks.filter((t) => t.id !== id),
    }));

    setActiveId((curr) => (curr === id ? null : curr));
  };

  const updateTask = (task: TaskJson) => {
    setTasksJson((prev) => ({
      tasks: prev.tasks.map((t) => (t.id === task.id ? task : t)),
    }));

    // sidebar label sync
    setSlots((prev) =>
      prev.map((s) =>
        s?.id === task.id ? { ...s, label: task.task_title } : s,
      ),
    );
  };


  const reorderSlots = (from: number, to: number) => {
    setSlots((prevSlots) => {
      if (from === to) return prevSlots;
      if (!prevSlots[from]) return prevSlots;

      const copy = prevSlots.slice();
      [copy[from], copy[to]] = [copy[to], copy[from]];

      // JSON reorder
      setTasksJson((prevJson) => {
        const map = new Map(prevJson.tasks.map((t) => [t.id, t]));

        const reordered = copy
          .filter((s): s is NonNullable<typeof s> => s !== null)
          .map((s) => map.get(s.id))
          .filter((t): t is TaskJson => !!t);

        return { tasks: reordered };
      });

      return copy;
    });
  };

  const saveWorksheetToDB = async () => {
    setIsLoading(true);
    try {
      const worksheetData = {
        title: 'test',
        assignments: [
          {
            classroom_id: 6,
            password: 'alma123',
          },
        ],
        subject_id: 1,
        lifetime_minutes: 60,
        max_time_to_resolve_minutes: 45,
        max_points: 1,
        is_public: 0,
        tasks: tasksJson.tasks,
      };

      console.log(worksheetData)
      await uploadWorksheet(worksheetData);
      setWorksheetMessage({ type: 'success', message: "Sikeres mentés"});
    } catch (e: any) {
      const errorData = e.response?.data;
      const errors = errorData?.errors;

      if (errors) {
        setWorksheetErrors(errors);
      }

      console.log('Szerver hiba:', errorData);

      setWorksheetMessage({
        message: errorData?.message || 'Ismeretlen hiba történt',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    slots,
    tasksJson,
    activeId,
    activeTask,
    selectTask,
    createTask,
    removeTask,
    updateTask,
    reorderSlots,
    saveWorksheetToDB,
    worksheetMessage,
    setWorksheetMessage,
    worksheetErrors,
    isLoading,
    setIsLoading,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks must be used inside TasksProvider');
  return ctx;
}
