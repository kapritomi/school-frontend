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
      <section className="space-y-4 mt-4">
        <label className="block text-primary text-[30px] font-semibold">
          A feladat címe:
        </label>
        <input
          value={task.task_title}
          onChange={(e) => updateTask({ ...task, task_title: e.target.value })}
          className="block w-full rounded-[6px] p-2 border-[1px] border-[#818181]"
        />
      </section>

      <section className="mt-8">
        <label className="block text-primary text-[30px] font-semibold">
          Feladatleírás:
        </label>
        <textarea
          value={task.task_description}
          onChange={(e) =>
            updateTask({ ...task, task_description: e.target.value })
          }
          className="block w-full rounded-[6px] p-2 border-[1px] border-[#818181]"
        />
      </section>

      <div className="mt-8">
        <button
          type="button"
          onClick={addQuestion}
          className="px-3 py-2 rounded-lg bg-primary text-white"
        >
          + Új kérdés
        </button>
      </div>

      <div className="mt-6 grid gap-4">
        {shortData.questions.map((item, index) => (
          <div key={index} className="border rounded-lg p-4 bg-white">
            <div className="mb-3">
              <label className="block mb-1 font-medium">Kérdés</label>
              <input
                value={item.question}
                onChange={(e) =>
                  updateQuestion(index, 'question', e.target.value)
                }
                className="w-full rounded-[6px] p-2 border-[1px] border-[#818181]"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 font-medium">Válasz</label>
              <input
                value={item.answer}
                onChange={(e) =>
                  updateQuestion(index, 'answer', e.target.value)
                }
                className="w-full rounded-[6px] p-2 border-[1px] border-[#818181]"
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
