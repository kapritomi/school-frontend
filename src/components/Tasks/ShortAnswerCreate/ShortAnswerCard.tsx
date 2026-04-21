import { ArrowDownIcon } from '@/assets/Icons/ArrowDownIcon';
import { ArrowUpIcon } from '@/assets/Icons/ArrowUpIcon';
import { BinIcon } from '@/assets/Icons/BinIcon';
import { useTasks } from '@/store/TasksContext';
import type { ShortQuestion } from '@/types/tasks';
import { getFieldError } from '@/utils/GetFieldError';

interface QuestionCardProps {
  item: ShortQuestion;
  index: number;
  activeTaskId: string | number;
  getMap: () => Map<string, HTMLDivElement>;
  removeQuestion: (index: number) => void;
  updateQuestion: (
    index: number, 
    field: 'question' | 'answer' | 'isExpanded', 
    value: string | boolean
  ) => void;
}

export const ShortAnswerCard = ({
  item,
  index,
  activeTaskId,
  getMap,
  removeQuestion,
  updateQuestion,
}: QuestionCardProps) => {
  const { worksheetErrors } = useTasks();
  const fieldPath = `tasks.${Number(activeTaskId) - 1}.questions.${index}`;
  const error = getFieldError(worksheetErrors, fieldPath);

  const containerClasses = `
    border w-full flex flex-col gap-[13px] rounded-[5px] text-gray duration-300 transition-all p-4 bg-white
    ${error ? 'border-alert border-[2px]' : 'border-[#8FBF6D]'}
    ${item.isExpanded ? 'max-h-[600px]' : 'max-h-[140px] overflow-hidden'}
  `;

  return (
    <div
      ref={(node) => {
        const map = getMap();
        if (node) map.set(String(index), node);
        else map.delete(String(index));
      }}
      id={fieldPath}
      className={containerClasses}
    >
      {/* Header szekció */}
      <div className="flex justify-between items-center">
        <p className="text-[22px] font-medium">{index + 1}. Kérdés</p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="cursor-pointer hover:scale-110 transition-transform"
            onClick={() => removeQuestion(index)}
          >
            <BinIcon color="#FF575A" />
          </button>
          <button
            type="button"
            className="cursor-pointer hover:bg-gray-100 p-1 rounded-full"
            onClick={() =>
              updateQuestion(index, 'isExpanded', !item.isExpanded)
            }
          >
            {item.isExpanded ? <ArrowDownIcon /> : <ArrowUpIcon />}
          </button>
        </div>
      </div>

      {/* Tartalmi szekció */}
      {item.isExpanded ? (
        <div className="flex flex-col gap-[10px]">
          {/* Kérdés Textarea */}
          <div className="flex flex-col gap-[15px]">
            <label className="font-medium">Kérdés vagy kép</label>
            <textarea
              maxLength={150}
              value={item.question}
              onChange={(e) =>
                updateQuestion(index, 'question', e.target.value)
              }
              className="w-full shadow-md resize-none h-[110px] p-4 rounded-[8px] border border-lightBorder outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          {/* Kép feltöltés */}
            <div className="flex flex-col gap-[15px]">
            <label htmlFor="pairQuestionImage" className="block font-medium">
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

          {/* Válasz Input */}
          <div className="flex flex-col gap-[15px]">
            <label className="font-medium">Válasz</label>
            <textarea
              maxLength={50}
              value={item.answer}
              onChange={(e) => updateQuestion(index, 'answer', e.target.value)}
              className="w-full shadow-md resize-none p-4 h-[90px] rounded-[8px] border border-lightBorder outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          {/* Hibaüzenet */}
          {error && (
            <p className="text-alert text-[18px] font-medium mt-1">{error}</p>
          )}
        </div>
      ) : (
        /* Összecsukott állapot */
        <div className="flex text-[16px] flex-col opacity-70">
          <p className="w-3/4 truncate font-medium">
            {item.question || 'Nincs kérdés megadva'}
          </p>
          {item.question && item.answer && (
            <div className="h-[1px] w-4 bg-gray-300 my-1" />
          )}
          <p className="w-3/4 truncate italic">
            {item.answer || 'Nincs válasz megadva'}
          </p>
        </div>
      )}
    </div>
  );
};
