import { useTasks } from '@/store/TasksContext';
import { getFieldError } from '@/utils/GetFieldError';

export const TaskTitle = () => {
  const { updateTask, activeTask, worksheetErrors } = useTasks();
  if (activeTask)
    return (
      <section className="flex flex-col gap-LabelDescriptionInputSpace">
        <label className="block text-primary text-[30px] font-semibold">
          A feladat címe:
        </label>
        <input
          id={`tasks.${activeTask.id}.title`}
          value={activeTask.task_title}
          onChange={(e) =>
            updateTask({ ...activeTask, task_title: e.target.value })
          }
          className={` ${
            worksheetErrors &&
            Object.keys(worksheetErrors).includes(
              `tasks.${Number(activeTask.id) - 1}.task_title`,
            )
              ? 'border-alert border-[2px]'
              : 'border-lightBorder'
          } shadow-md w-full p-4 outline-none text-gray  h-[48px] border-[1px] rounded-[8px] focus:border-primary focus:ring-1 focus:ring-primary`}
        />

        {worksheetErrors &&
          Object.keys(worksheetErrors).includes(
            `tasks.${Number(activeTask.id) - 1}.task_title`,
          ) && (
            <p className="text-[18px] text-alert">
              {getFieldError(
                worksheetErrors,
                `tasks.${Number(activeTask.id) - 1}.task_title`,
              )}
            </p>
          )}
      </section>
    );
};
