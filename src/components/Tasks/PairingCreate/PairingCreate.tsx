import { ArrowDownIcon } from '@/assets/Icons/ArrowDownIcon';
import { BinIcon } from '../../../assets/Icons/BinIcon';

import { useTasks } from '../../../store/TasksContext';
import { ArrowUpIcon } from '@/assets/Icons/ArrowUpIcon';

import { useEffect } from 'react';
import { usePairing } from './UsePairing';
import { getFieldError } from '@/utils/GetFieldError';
import { PairingCard } from './PairingCard';
import { TaskTitle } from '../TaskTitle';
import { TaskDescription } from '../TaskDescription';

export default function PairingCreate() {
  const {
    getMap,
    prevLengthRef,
    removePair,
    scrollToId,
    updatePair,
    pairing,
    addPair,
  } = usePairing();
  const {activeTask, worksheetErrors } = useTasks();

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

  if (activeTask)
    return (
      <div className="flex  flex-col gap-ElementsSpace">
        {/* ---- Feladat címe ---- */}
        <TaskTitle></TaskTitle>
        {/* ---- Feladatleírás ---- */}
        <TaskDescription></TaskDescription>
        <section
          id={`tasks.${activeTask.id}.pairing.pairing_groups`}
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
                activeTask={activeTask}
                getMap={getMap}
                index={index}
                item={item}
                removePair={removePair}
                updatePair={updatePair}
                key={index}
              ></PairingCard>
            ))}
          </div>
          {worksheetErrors &&
            Object.keys(worksheetErrors).includes(
              `tasks.${Number(activeTask.id) - 1}.pairing.pairing_groups`,
            ) && (
              <p className="text-[18px] text-alert">
                {getFieldError(
                  worksheetErrors,
                  `tasks.${Number(activeTask.id) - 1}.pairing.pairing_groups`,
                )}
              </p>
            )}
        </section>

        <div>
          <button
            type="button"
            onClick={() => addPair()}
            className="px-3 w-[211px] py-2 rounded-lg cursor-pointer bg-primary text-white disabled:bg-opacity-75"
            disabled={!(pairing.pairing_groups.length < 8)}
          >
            + Új kérdés
          </button>
        </div>
      </div>
    );
}
