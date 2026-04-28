import type { TaskPreviewProps } from './Pairing';
import { useState } from 'react';
import { normalizeShortAnswerData } from './utils/TaskNormalizers';

function ShortAnswer({ task, dataType }: TaskPreviewProps) {
  console.log(task);
  if (!task) return;

  const questions = normalizeShortAnswerData(task, dataType);

  // opcionális: helyi state az inputokhoz
  const [answers, setAnswers] = useState<string[]>(questions.map(() => ''));

  const handleChange = (index: number, value: string) => {
    const next = [...answers];
    next[index] = value;
    setAnswers(next);
  };

  return (
    <div>
      {/* feladat címe */}
      <div className="task-padding font-semibold text-TaskTitle">
        {task.task_title}
      </div>
      {/* feladat leírása */}
      <div className="task-padding font-semibold text-TaskDesc">
        {task.task_description}
      </div>

      <div className="task-padding grid grid-cols-6 gap-8">
        {questions.map((item, index) =>
          item.img ? (
            <div
              key={index}
              className="bg-white mb-6 p-2 h-[260px] w-[250px] rounded-[8px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            >
              <div className="text-center w-[238px] h-[193px] text-[18px] p-2 font-semibold">
                <img
                  className="w-full h-full object-cover"
                  src={`http://localhost:${import.meta.env.VITE_PORT}/storage${item.img}`}
                  alt="Kép"
                />
              </div>
              <div className="px-[6px] pb-[6px] ">
                <input
                  className="w-full h-[35px] border-[#D1D5DB] shadow-[inset_1px_2px_8px_rgba(0,0,0,0.25)] rounded-[5px] pl-2"
                  type="text"
                  value={answers[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div
              key={index}
              className="bg-white mb-6 h-fit rounded-[8px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            >
              <div className="text-center text-[18px] p-2 font-semibold">
                {item.question}
              </div>
              <div className="px-[6px] pb-[6px] pt-8">
                <input
                  className="w-full h-[35px] border-[#D1D5DB] shadow-[inset_1px_2px_8px_rgba(0,0,0,0.25)] rounded-[5px] pl-2"
                  type="text"
                  value={answers[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
export default ShortAnswer;
