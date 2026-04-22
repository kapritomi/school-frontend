import { useTasks } from '@/store/TasksContext';
import type { creatingComponentProps, TaskJson } from '@/types/tasks';
import { useEffect, useState } from 'react';

export const TaskDescription = ({ taskId }: creatingComponentProps) => {
  const { updateTask, tasksJson } = useTasks();
  const [taskToUpdate, setTaskToUpdate] = useState<null | TaskJson>(null);

  useEffect(() => {
    setTaskToUpdate(tasksJson.tasks[Number(taskId) - 1]);
  }, [taskId, tasksJson]);
  if (taskToUpdate)
    return (
      <section className="flex flex-col gap-LabelDescriptionInputSpace">
        <div className="flex flex-col gap-LabelDescriptionSpace">
          <label className="block text-primary text-[30px] font-semibold">
            Feladatleírás:
          </label>
          <p className="text-[#818181]  text-[15px]">
            Adja meg a feladat leírását. Ez a feladat índításakor fog
            megjelenni. A leírás megadása nem kötelező, üresen hagyhatja a
            mezőt.
          </p>
        </div>
        <textarea
          value={taskToUpdate.task_description}
          onChange={(e) =>
            updateTask({ ...taskToUpdate, task_description: e.target.value })
          }
          maxLength={255}
          className="w-full shadow-md resize-none p-4 h-[70px] rounded-[8px] border-[1px] border-lightBorder outline-none text-gray transition-all
                     focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </section>
    );
};
