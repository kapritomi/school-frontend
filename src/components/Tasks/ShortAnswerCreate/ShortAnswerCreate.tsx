import { useTasks } from '../../../store/TasksContext';
import { useEffect, useRef } from 'react';
import { useShortAnswer } from './UseShortAnswer';
import { TaskTitle } from '../TaskTitle';
import { TaskDescription } from '../TaskDescription';
import { AddButton } from '../AddButton';
import { getFieldError } from '@/utils/GetFieldError';
import { ShortAnswerCard } from './ShortAnswerCard';
import type { TaskJson } from '@/types/tasks';

function ShortAnswerCreate({ task, index }: { task: TaskJson; index: number }) {
  const { worksheetErrors } = useTasks();
  const { addQuestion, getMap, removeQuestion, scrollToId, updateQuestion } =
    useShortAnswer();

  const shortData = task?.short_answer ?? { questions: [] };
  const prevLengthRef = useRef(shortData.questions.length);

  useEffect(() => {
    const currentLength = shortData.questions.length;
    const prevLength = prevLengthRef.current;

    if (currentLength > prevLength) {
      const lastIndex = currentLength - 1;

      const timer = setTimeout(() => {
        scrollToId(String(lastIndex));
      }, 100);

      prevLengthRef.current = currentLength;
      return () => clearTimeout(timer);
    }

    prevLengthRef.current = currentLength;
  }, [shortData.questions.length]);

  if (task)
    return (
      <div
        id={`task-${task.id}`}
        className="flex min-h-[900px] flex-col gap-ElementsSpace"
      >
        <div className="pt-4">
          <span className=" px-3 py-1 rounded-full bg-primary text-white font-semibold">
            <span className="font-black">•</span> {index + 1}. Feladat
          </span>
        </div>

        {/* ---- Feladat címe ---- */}
        <TaskTitle taskId={task.id}></TaskTitle>
        {/* ---- Feladatleírás ---- */}
        <TaskDescription taskId={task.id}></TaskDescription>
        {/* ---- Új kérdés gomb ---- */}
        <section>
          <div className="flex flex-col gap-LabelDescriptionSpace">
            <p className="text-primary text-[30px] font-semibold">Kártyák:</p>
            <p className="text-gray  text-[15px]">
              Kártyánként legalább egy tartalmat és a hozzá tartozó megoldást
              kell megadnia.
            </p>
          </div>

          <div className="flex flex-col gap-4 w-1/2">
            {shortData.questions.map((item, index) => (
              <ShortAnswerCard
                activeTaskId={task.id}
                getMap={getMap}
                index={index}
                item={item}
                removeQuestion={(idx) => removeQuestion(idx, task)}
                updateQuestion={(idx, field, val) =>
                  updateQuestion(task, idx, field, val)
                }
                key={index}
              ></ShortAnswerCard>
            ))}
          </div>

          {worksheetErrors &&
            Object.keys(worksheetErrors).includes(
              `tasks.${Number(task.id) - 1}.short_answer.questions`,
            ) && (
              <p className="text-[18px] text-alert">
                {getFieldError(
                  worksheetErrors,
                  `tasks.${Number(task.id) - 1}.short_answer.questions`,
                )}
              </p>
            )}
        </section>

        <AddButton
          label="+ Új kérdés"
          onClick={() => addQuestion(task)}
          disabled={shortData.questions.length >= 18}
        ></AddButton>
      </div>
    );
}

export default ShortAnswerCreate;
