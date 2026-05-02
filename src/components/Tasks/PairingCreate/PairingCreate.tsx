import { useTasks } from '../../../store/TasksContext';
import { useEffect, useRef } from 'react';
import { usePairing } from './UsePairing';
import { getFieldError } from '@/utils/GetFieldError';
import { PairingCard } from './PairingCard';
import { TaskTitle } from '../TaskTitle';
import { TaskDescription } from '../TaskDescription';
import { AddButton } from '../AddButton';
import type { TaskJson } from '@/types/tasks';

export default function PairingCreate({
  task,
  index,
}: {
  task: TaskJson;
  index: number;
}) {
  const { getMap, removePair, scrollToId, updatePair, addPair } = usePairing();
  const { worksheetErrors } = useTasks();
  const pairing = task?.pairing ?? { pairing_groups: [] };
  const prevLengthRef = useRef(pairing.pairing_groups.length);

  useEffect(() => {
    const currentLength = pairing.pairing_groups.length;
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
  }, [pairing.pairing_groups.length]);

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
        <section
          id={`tasks.${task.id}.pairing.pairing_groups`}
          className="flex flex-col gap-[13px]"
        >
          <div className="flex flex-col gap-LabelDescriptionSpace">
            <p className="text-primary text-[30px] font-semibold">Párok:</p>
            <p className="text-gray  text-[15px]">
              Kártyánként legalább egy tartalmat és a hozzá tartozó megoldást
              kell megadnia.
            </p>
          </div>
          {/* ---- Kérdés létrehozás field */}
          <div className="flex  flex-col gap-4 w-1/2">
            {pairing.pairing_groups.map((item, index) => (
              <PairingCard
                activeTask={task}
                getMap={getMap}
                index={index}
                item={item}
                removePair={(idx) => removePair(idx, task)}
                updatePair={(idx, field, val) =>
                  updatePair(task, idx, field, val)
                }
                key={index}
              ></PairingCard>
            ))}
          </div>
          {worksheetErrors &&
            Object.keys(worksheetErrors).includes(
              `tasks.${Number(task.id)}.pairing.pairing_groups`,
            ) && (
              <p className="text-[18px] text-alert">
                {getFieldError(
                  worksheetErrors,
                  `tasks.${Number(task.id)}.pairing.pairing_groups`,
                )}
              </p>
            )}
        </section>

        <AddButton
          label="+ Új kérdés"
          onClick={() => addPair(task)}
          disabled={!(pairing.pairing_groups.length < 8)}
        ></AddButton>
      </div>
    );
}
