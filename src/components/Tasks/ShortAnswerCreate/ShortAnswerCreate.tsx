import { useTasks } from '../../../store/TasksContext';
import { useEffect } from 'react';
import { useShortAnswer } from './UseShortAnswer';
import { TaskTitle } from '../TaskTitle';
import { TaskDescription } from '../TaskDescription';
import { AddButton } from '../AddButton';
import { getFieldError } from '@/utils/GetFieldError';
import { ShortAnswerCard } from './ShortAnswerCard';
import type { creatingComponentProps } from '@/types/tasks';

function ShortAnswerCreate({ taskId }: creatingComponentProps) {
  const { activeTask, worksheetErrors } = useTasks();
  const {
    addQuestion,
    getMap,
    prevLengthRef,
    removeQuestion,
    scrollToId,
    shortData,
    updateQuestion,
  } = useShortAnswer();
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

  if (activeTask && taskId)
    return (
      <div className="flex flex-col gap-ElementsSpace">
        {/* ---- Feladat címe ---- */}
        <TaskTitle taskId={taskId}></TaskTitle>
        {/* ---- Feladatleírás ---- */}
        <TaskDescription taskId={taskId}></TaskDescription>
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
                activeTaskId={activeTask.id}
                getMap={getMap}
                index={index}
                item={item}
                removeQuestion={removeQuestion}
                updateQuestion={updateQuestion}
                key={index}
              ></ShortAnswerCard>
            ))}
          </div>

          {worksheetErrors &&
            Object.keys(worksheetErrors).includes(
              `tasks.${Number(activeTask.id) - 1}.short_answer.questions`,
            ) && (
              <p className="text-[18px] text-alert">
                {getFieldError(
                  worksheetErrors,
                  `tasks.${Number(activeTask.id) - 1}.short_answer.questions`,
                )}
              </p>
            )}
        </section>

        <AddButton
          label="+ Új kérdés"
          onClick={addQuestion}
          disabled={shortData.questions.length >= 18}
        ></AddButton>
      </div>
    );
}

export default ShortAnswerCreate;
