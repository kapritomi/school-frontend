import { useTasks } from '@/store/TasksContext';

export const TaskDescription = () => {
  const { updateTask, activeTask } = useTasks();
  if (activeTask)
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
          value={activeTask.task_description}
          onChange={(e) =>
            updateTask({ ...activeTask, task_description: e.target.value })
          }
          maxLength={255}
          className="w-full shadow-md resize-none p-4 h-[70px] rounded-[8px] border-[1px] border-lightBorder outline-none text-gray transition-all
                     focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </section>
    );
};
