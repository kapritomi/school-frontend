import { useTasks } from '../../store/useTasks';

function ShortAnswerCreate() {
  const { activeTask, updateTask } = useTasks();

  if (!activeTask) return null;

  const task = activeTask;
  const shortData = task.short_answer ?? { questions: [] };

  const addQuestion = () => {
    updateTask({
      ...task,
      short_answer: {
        questions: [...shortData.questions, { question: '', answer: '' }],
      },
    });
  };

  const updateQuestion = (
    index: number,
    field: 'question' | 'answer',
    value: string,
  ) => {
    const nextQuestions = shortData.questions.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );

    updateTask({
      ...task,
      short_answer: {
        questions: nextQuestions,
      },
    });
  };

  const removeQuestion = (index: number) => {
    updateTask({
      ...task,
      short_answer: {
        questions: shortData.questions.filter((_, i) => i !== index),
      },
    });
  };

  return (
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
          onClick={addQuestion}
          className="px-3 py-2 rounded-lg bg-primary text-white"
        >
          + Új kérdés
        </button>
      </div>
      {/* ---- Kérdés létrehozás field */}
      <div className="mt-6 grid gap-4 w-1/2">
        {shortData.questions.map((item, index) => (
          <div key={index} className="border rounded-[5px] border-[#8FBF6D] p-4 bg-white">
            <div className="mb-3">
              <label className="block mb-1 font-medium">Kérdés vagy kép</label>
              <input
                value={item.question}
                onChange={(e) =>
                  updateQuestion(index, 'question', e.target.value)
                }
                className="w-3/4 rounded-[6px] p-2 border border-gray focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 font-medium">Válasz</label>
              <input
                value={item.answer}
                onChange={(e) =>
                  updateQuestion(index, 'answer', e.target.value)
                }
                className="w-3/4 rounded-[6px] p-2 border border-gray focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <button
              type="button"
              onClick={() => removeQuestion(index)}
              className="px-3 py-2 rounded-lg border border-red-400 text-red-500"
            >
              Törlés
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShortAnswerCreate;
