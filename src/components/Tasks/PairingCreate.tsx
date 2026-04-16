import { ArrowDownIcon } from '@/assets/Icons/ArrowDownIcon';
import { BinIcon } from '../../assets/Icons/BinIcon';

import { useTasks } from '../../store/TasksContext';
import { ArrowUpIcon } from '@/assets/Icons/ArrowUpIcon';

export default function PairingCreate() {
  const { activeTask, updateTask } = useTasks();

  if (!activeTask) return null;

  const task = activeTask;
  const pairing = task.pairing ?? { pairing_groups: [] };

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

  const handleExpandQuestion = (index: number) => {
    updatePair(index, 'isExpanded', true);
  };

  return (
    <div className="h-fit">
      {/* ---- Feladat címe ---- */}
      <section className="space-y-4 mt-4">
        <label className="block text-primary text-[30px] font-semibold">
          A feladat címe:
        </label>
        <input
          value={task.task_title}
          onChange={(e) => updateTask({ ...task, task_title: e.target.value })}
          className="border-lightBorder w-full p-4 outline-none text-gray  h-[48px] border-[1px] rounded-[8px] focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </section>
      {/* ---- Feladatleírás ---- */}
      <section className="mt-8">
        <label className="block text-primary text-[30px] font-semibold">
          Feladatleírás:
        </label>
        <p className="text-[#818181] mt-4 mb-2 text-[15px]">
          Adja meg a feladat leírását. Ez a feladat índításakor fog megjelenni.
          A leírás megadása nem kötelező, üresen hagyhatja a mezőt.
        </p>
        <textarea
          value={task.task_description}
          onChange={(e) =>
            updateTask({ ...task, task_description: e.target.value })
          }
          maxLength={255}
          className="w-full resize-none p-4 h-[70px] rounded-[8px] border-[1px] border-lightBorder outline-none text-gray transition-all
             focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </section>

      {/* ---- Új kérdés gomb ---- */}
      <div className="mt-8">
        <h1 className="text-primary text-[30px] font-semibold">Párok:</h1>
        <p className="text-gray mt-4 mb-2 text-[15px]">
          Kártyánként legalább egy tartalmat és a hozzá tartozó megoldást kell
          megadnia.
        </p>
        <button
          type="button"
          onClick={() => addPair()}
          className="px-3 py-2 rounded-lg bg-primary text-white"
        >
          + Új kérdés
        </button>
      </div>
      {/* ---- Kérdés létrehozás field */}
      <div className="mt-6 grid  gap-4 w-1/2">
        {pairing.pairing_groups.map((item, index) => (
          <div
            key={index}
            className="border rounded-[5px] text-gray border-[#8FBF6D] p-4 bg-white"
          >
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
                  onClick={() => handleExpandQuestion(index)}
                >
                  {item.isExpanded ? (
                    <ArrowDownIcon></ArrowDownIcon>
                  ) : (
                    <ArrowUpIcon></ArrowUpIcon>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="pairQuestionQuestion"
                className="block mb-1 font-medium"
              >
                Kérdés vagy leírás
              </label>
              <input
                name="pairQuestionQuestion"
                value={item.pair_question}
                onChange={(e) =>
                  updatePair(index, 'pair_question', e.target.value)
                }
                className="w-3/4 rounded-[6px] p-2 border outline-none border-gray focus:outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="pairQuestionImage"
                className="block mb-1 font-medium"
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
                  file:border-gray
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

            <div className="mb-3">
              <label
                htmlFor="pairQuestionAnswer"
                className="block mb-1 font-medium"
              >
                Válasz
              </label>
              <input
                name="pairQuestionAnswer"
                value={item.pair_answer}
                onChange={(e) =>
                  updatePair(index, 'pair_answer', e.target.value)
                }
                className="w-3/4 rounded-[6px] p-2 border outline-none border-gray focus:outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
