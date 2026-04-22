import { useTasks } from '@/store/TasksContext';
import type { creatingComponentProps, TaskJson } from '@/types/tasks';
import { getFieldError } from '@/utils/GetFieldError';
import { useEffect, useState } from 'react';

export const TaskTitle = ({ taskId }: creatingComponentProps) => {
  const { updateTask, worksheetErrors, tasksJson } = useTasks();
  const [taskToUpdate, setTaskToUpdate] = useState<null | TaskJson>(null);

  useEffect(() => {
    setTaskToUpdate(tasksJson.tasks[Number(taskId) - 1]);
  }, [taskId, tasksJson]);

  if (taskToUpdate)
    return (
      <section className="flex flex-col gap-LabelDescriptionInputSpace">
        <label className="block text-primary text-[30px] font-semibold">
          A feladat címe:
        </label>
        <input
          id={`tasks.${taskToUpdate.id}.title`}
          value={taskToUpdate.task_title}
          onChange={(e) =>
            updateTask({ ...taskToUpdate, task_title: e.target.value })
          }
          className={` ${
            worksheetErrors &&
            Object.keys(worksheetErrors).includes(
              `tasks.${Number(taskToUpdate.id) - 1}.task_title`,
            )
              ? 'border-alert border-[2px]'
              : 'border-lightBorder'
          } shadow-md w-full p-4 outline-none text-gray  h-[48px] border-[1px] rounded-[8px] focus:border-primary focus:ring-1 focus:ring-primary`}
        />

        {worksheetErrors &&
          Object.keys(worksheetErrors).includes(
            `tasks.${Number(taskToUpdate.id) - 1}.task_title`,
          ) && (
            <p className="text-[18px] text-alert">
              {getFieldError(
                worksheetErrors,
                `tasks.${Number(taskToUpdate.id) - 1}.task_title`,
              )}
            </p>
          )}
      </section>
    );
};
