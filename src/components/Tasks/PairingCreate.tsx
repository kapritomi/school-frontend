import { ArrowDownIcon } from '@/assets/Icons/ArrowDownIcon';
import { BinIcon } from '../../assets/Icons/BinIcon';

import { useTasks } from '../../store/TasksContext';
import { ArrowUpIcon } from '@/assets/Icons/ArrowUpIcon';
import type { PairGroup } from '@/types/tasks';
import { useEffect, useRef } from 'react';
import  type { TaskJson } from '@/types/tasks';

export default function PairingCreate({ task }: { task: TaskJson }) {
  const { updateTask } = useTasks();
  const itemsRef = useRef<Map<string, HTMLDivElement> | null>(null);

  const pairing = task.pairing ?? { pairing_groups: [] };
  const prevLengthRef = useRef(pairing.pairing_groups.length);

  const addPair = () => {
    if (pairing.pairing_groups.length < 8) {
      updateTask({
        ...task,
        pairing: {
          pairing_groups: [
            ...pairing.pairing_groups,
            { pair_question: '', pair_answer: '', isExpanded: true },
          ],
        },
      });
    }
  };

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

  const updatePair = (
    index: number,
    field: 'pair_question' | 'pair_answer' | 'isExpanded',
    value: string | boolean,
  ) => {
    const next = pairing.pairing_groups.map((p, i) =>
      i === index ? { ...p, [field]: value } : p,
    );

    updateTask({
      ...task,
      pairing: {
        pairing_groups: next,
      },
    });
  };

  const removePair = (index: number) => {
    updateTask({
      ...task,
      pairing: {
        pairing_groups: pairing.pairing_groups.filter((_, i) => i !== index),
      },
    });
  };

  function getMap() {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  const scrollToId = (id: string) => {
  const map = getMap();
  const node = map.get(id);
  const container = document.getElementById('scroll-container'); // A belső görgethető div ID-ja

  if (node && container) {
   
    const topPos = node.offsetTop;

    container.scrollTo({
      top: topPos,
      behavior: 'smooth'
    });
  }
};

  const handleExpandQuestion = (index: number, item: PairGroup) => {
    updatePair(index, 'isExpanded', !item.isExpanded);
  };

  return (
    <div id={`task-${task.id}`} className="flex min-h-[900px] flex-col gap-ElementsSpace">
      {/* ---- Feladat címe ---- */}
      <section className="flex flex-col gap-LabelDescriptionInputSpace">
        <label className="block text-primary text-[30px] font-semibold">
          A feladat címe:
        </label>
        <input
          value={task.task_title}
          onChange={(e) => updateTask({ ...task, task_title: e.target.value })}
          className="border-lightBorder shadow-md w-full p-4 outline-none text-gray  h-[48px] border-[1px] rounded-[8px] focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </section>
      {/* ---- Feladatleírás ---- */}
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
          value={task.task_description}
          onChange={(e) =>
            updateTask({ ...task, task_description: e.target.value })
          }
          maxLength={255}
          className="w-full shadow-md resize-none p-4 h-[70px] rounded-[8px] border-[1px] border-lightBorder outline-none text-gray transition-all
             focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </section>

      {/* ---- Új kérdés gomb ---- */}
      <div className="flex flex-col gap-LabelDescriptionSpace">
        <p className="text-primary text-[30px] font-semibold">Párok:</p>
        <p className="text-gray  text-[15px]">
          Kártyánként legalább egy tartalmat és a hozzá tartozó megoldást kell
          megadnia.
        </p>
      </div>
      {/* ---- Kérdés létrehozás field */}
      <div className="flex flex-col gap-4 w-1/2">
        {pairing.pairing_groups.map((item, index) => (
          <div
            ref={(node) => {
              const map = getMap();
              if (node) {
                map.set(String(index), node);
              } else {
                map.delete(String(index));
              }
            }}
            id={`tasks.${Number(task.id)-1}.pairing.pairing_groups.${index}`}
            key={index}
            className={`border w-full flex flex-col gap-[13px] rounded-[5px] text-gray duration-300  transition-all border-[#8FBF6D] p-4 bg-white ${item.isExpanded ? 'max-h-[600px]' : 'max-h-[140px] overflow-hidden'}`}
          >
            {/* Kartya header */}
            <div className="flex justify-between">
              <p className=" text-[22px]">{index + 1}. Pár</p>
              <div className="flex items-center gap-3">
                <div
                  className="cursor-pointer"
                  onClick={() => removePair(index)}
                >
                  <BinIcon color="#FF575A"></BinIcon>
                </div>

                <div
                  className="cursor-pointer "
                  onClick={() => handleExpandQuestion(index, item)}
                >
                  {item.isExpanded ? (
                    <ArrowDownIcon></ArrowDownIcon>
                  ) : (
                    <ArrowUpIcon></ArrowUpIcon>
                  )}
                </div>
              </div>
            </div>
            {/* Kartya body */}
            {item.isExpanded ? (
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[15px]">
                  <label
                    htmlFor="pairQuestionQuestion"
                    className="block  font-medium"
                  >
                    Kérdés vagy leírás
                  </label>
                  <textarea
                    maxLength={130}
                    name="pairQuestionQuestion"
                    value={item.pair_question}
                    onChange={(e) =>
                      updatePair(index, 'pair_question', e.target.value)
                    }
                    className="w-full  shadow-md resize-none h-[90px] p-4 rounded-[8px] border-[1px] border-lightBorder outline-none text-gray transition-all
             focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-[15px]">
                  <label
                    htmlFor="pairQuestionImage"
                    className="block font-medium"
                  >
                    Kép
                  </label>
                  <input
                    className="
                  w-1/2
                  text-sm 
                  file:cursor-pointer
                  file:mr-4
                  file:py-2
                  file:px-4
                  file:rounded-md
                  file:border-[1px]   
                  file:border-solid
                  file:border-lightBorder
                  file:text-sm
                  file:bg-white
                  file:text-gray
                 
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  "
                    type="file"
                    accept="image/*"
                    disabled={item.pair_question ? true : false}
                  />
                </div>

                <div className="flex flex-col gap-[15px]">
                  <label
                    htmlFor="pairQuestionAnswer"
                    className="block  font-medium"
                  >
                    Válasz
                  </label>
                  <textarea
                    maxLength={130}
                    name="pairQuestionAnswer"
                    value={item.pair_answer}
                    onChange={(e) =>
                      updatePair(index, 'pair_answer', e.target.value)
                    }
                    className="w-full  shadow-md resize-none p-4 h-[90px] rounded-[8px] border-[1px] border-lightBorder outline-none text-gray transition-all
             focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            ) : (
              <div className="flex text-[16px] flex-col">
                <p className="w-3/4  truncate">{item.pair_question}</p>
                {item.pair_answer && item.pair_question && (
                  <p className="">-</p>
                )}

                <p className="w-3/4 truncate ">{item.pair_answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8">
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
