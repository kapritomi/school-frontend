import { useTasks } from "../store/useTasks";


export default function PairingCreate (){
    const { activeTask, updateTask } = useTasks();

    if (!activeTask) return null;

    const task = activeTask;
    const pairing = task.pairing ?? { pairing_groups: [] };

    const addPair = () => {
        updateTask({
        ...task,
        pairing: {
            pairing_groups:[
                ...pairing.pairing_groups,
            { pair_question: "", pair_answer: "" },
            ]
            
        },
        });
    };

  const updatePair = (
    index: number,
    field: "pair_question" | "pair_answer",
    value: string
    ) => {
    const next = pairing.pairing_groups.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
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


    return(
        <div>
            {/* ---- Feladat címe ---- */}
            <section className="space-y-4 mt-4">
                <label className="block text-primary text-[30px] font-semibold">
                    A feladat címe:
                </label>
                <input
                value={task.task_title}
                onChange={(e) =>
                    updateTask({ ...task, task_title: e.target.value })
                }
                className="block w-full rounded-[6px] p-2 border-[1px] border-[#818181] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                />
            </section>
            {/* ---- Feladatleírás ---- */}
            <section className="mt-8">
                <label className="block text-primary text-[30px] font-semibold">
                    Feladatleírás:
                </label>
                <p className="text-[#818181] mt-4 mb-2 text-[15px]">
                    Adja meg a feladat leírását. Ez a feladat índításakor fog megjelenni. A leírás megadása nem
                    kötelező, üresen hagyhatja a mezőt.
                </p>
                <textarea
                value={task.task_description}
                onChange={(e) =>
                    updateTask({ ...task, task_description: e.target.value })
                }
                className="block w-full rounded-[6px] p-2 border-[1px] border-[#818181] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                />
            </section>

            {/* ---- Új kérdés gomb ---- */}
      <div className="mt-8">
        <h1 className="text-primary text-[30px] font-semibold">Kártyák:</h1>
        <p className="text-[#818181] mt-4 mb-2 text-[15px]">Kártyánként legalább egy tartalmat és a hozzá tartozó megoldást kell megadnia.</p>
        <button
          type="button"
          onClick={addPair}
          className="px-3 py-2 rounded-lg bg-primary text-white"
        >
          + Új kérdés
        </button>
      </div>
      {/* ---- Kérdés létrehozás field */}
      <div className="mt-6 grid gap-4 w-1/2">
        {pairing.pairing_groups.map((item, index) => (
          <div key={index} className="border rounded-[5px] border-[#8FBF6D] p-4 bg-white">
            <div className="mb-3">
              <label className="block mb-1 font-medium">Kérdés vagy kép</label>
              <input
                value={item.pair_question}
                onChange={(e) =>
                  updatePair(index,"pair_question" , e.target.value)
                }
                className="w-3/4 rounded-[6px] p-2 border border-gray focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 font-medium">Válasz</label>
              <input
                value={item.pair_answer}
                onChange={(e) =>
                  updatePair(index, "pair_answer", e.target.value)
                }
                className="w-3/4 rounded-[6px] p-2 border border-gray focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <button
              type="button"
              onClick={() => removePair(index)}
              className="px-3 py-2 rounded-lg border border-red-400 text-red-500"
            >
              Törlés
            </button>
          </div>
        ))}
      </div>

        </div>
    )
}