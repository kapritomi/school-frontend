import type { ShortQuestion } from '@/types/tasks';
import { useTasks } from '../../store/TasksContext';
import { useEffect, useRef } from 'react';
import { ArrowUpIcon } from '@/assets/Icons/ArrowUpIcon';
import { ArrowDownIcon } from '@/assets/Icons/ArrowDownIcon';
import { BinIcon } from '@/assets/Icons/BinIcon';
import type { TaskJson } from '@/types/tasks';
function ShortAnswerCreate({ task, index }: { task: TaskJson; index: number }) {
  const { updateTask } = useTasks();
  const itemsRef = useRef<Map<string, HTMLDivElement> | null>(null);
  
  const shortData = task.short_answer ?? { questions: [] };
  const prevLengthRef = useRef(shortData.questions.length);

  const addQuestion = () => {
    if(shortData.questions.length <18)
    updateTask({
      ...task,
      short_answer: {
        questions: [
          ...shortData.questions,
          { question: '', answer: '', isExpanded: true },
        ],
      },
    });
  };

  const updateQuestion = (
    index: number,
    field: 'question' | 'answer' | 'isExpanded',
    value: string | boolean,
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

  const handleExpandQuestion = (index: number, item: ShortQuestion) => {
    updateQuestion(index, 'isExpanded', !item.isExpanded);
  };

  return (
    <div id={`task-${task.id}`} className="flex min-h-[900px] flex-col gap-ElementsSpace">
      <div className='pt-4'><span className=' px-3 py-1 rounded-full bg-primary text-white font-semibold'><span className='font-black'>•</span> {index+1}. Feladat</span></div>
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
        <p className="text-primary text-[30px] font-semibold">Kártyák:</p>
        <p className="text-gray  text-[15px]">
          Kártyánként legalább egy tartalmat és a hozzá tartozó megoldást kell
          megadnia.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-1/2">
        {shortData.questions.map((item, index) => (
          <div
            ref={(node) => {
              const map = getMap();
              if (node) {
                map.set(String(index), node);
              } else {
                map.delete(String(index));
              }
            }}
            key={index}
            className={`border w-full flex flex-col gap-[13px] rounded-[5px] text-gray duration-300  transition-all border-[#8FBF6D] p-4 bg-white ${item.isExpanded ? 'max-h-[600px]' : 'max-h-[140px] overflow-hidden'}`}
          >
            <div className="flex justify-between">
              <p className=" text-[22px]">{index + 1}. Kérdés</p>
              <div className="flex items-center gap-3">
                <div
                  className="cursor-pointer"
                  onClick={() => removeQuestion(index)}
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
            {item.isExpanded ? (
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[15px]">
                  <label className="block  font-medium">
                    Kérdés vagy kép
                  </label>
                  <textarea
                  maxLength={150}
                    value={item.question}
                    onChange={(e) =>
                      updateQuestion(index, 'question', e.target.value)
                    }
                    className="w-full  shadow-md resize-none h-[110px] p-4 rounded-[8px] border-[1px] border-lightBorder outline-none text-gray transition-all
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
                    disabled={item.question ? true : false}
                  />
                </div>


                <div className="flex flex-col gap-[15px]">
                  <label className="block  font-medium">Válasz</label>
                  <textarea
                  maxLength={50}
                    value={item.answer}
                    onChange={(e) =>
                      updateQuestion(index, 'answer', e.target.value)
                    }
                    className="w-full  shadow-md resize-none p-4 h-[90px] rounded-[8px] border-[1px] border-lightBorder outline-none text-gray transition-all
             focus:border-primary focus:ring-1 focus:ring-primary"></textarea>
                </div>
              </div>
            ) : (
              <div className="flex text-[16px] flex-col">
                <p className="w-3/4  truncate">{item.question}</p>
                {item.question && item.answer && <p className="">-</p>}

                <p className="w-3/4 truncate ">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
       <div className="mt-8">
        <button
        disabled={shortData.questions.length <=18}
        type="button"
        onClick={addQuestion}
        className="px-3 w-[211px] py-2 rounded-lg cursor-pointer bg-primary text-white disabled:bg-opacity-75"
      >
        + Új kérdés
      </button>
       </div>
      
    </div>
  );
}

export default ShortAnswerCreate;
