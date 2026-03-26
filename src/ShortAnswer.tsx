import type { TaskJson } from "./types/tasks"
import { useState } from "react";
   type ShortAnswerProps = {
  task: TaskJson;
};
function ShortAnswer ({ task }: ShortAnswerProps){
     if (!task.short_answer) return null;

  const questions = task.short_answer.questions;

  // opcionális: helyi state az inputokhoz
  const [answers, setAnswers] = useState<string[]>(questions.map(() => ""));

  const handleChange = (index: number, value: string) => {
    const next = [...answers];
    next[index] = value;
    setAnswers(next);
  };

    return(
        <div>
      {/* feladat címe */}
      <div className="task-padding font-semibold text-TaskTitle">{task.task_title}</div>
      {/* feladat leírása */}
      <div className="task-padding font-semibold text-TaskDesc">{task.task_description}</div>

      <div className="task-padding grid grid-cols-6 gap-8">
        {questions.map((item, index) => (
          <div
            key={index}
            className="bg-white mb-6 h-fit rounded-[8px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
          >
            <div className="text-center text-[18px] p-2 font-semibold">{item.question}</div>
            <div className="px-[6px] pb-[6px] pt-8">
              <input
                className="w-full h-[35px] border-[#D1D5DB] shadow-[inset_1px_2px_8px_rgba(0,0,0,0.25)] rounded-[5px] pl-2"
                type="text"
                value={answers[index]}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
    )
}
export default ShortAnswer;
