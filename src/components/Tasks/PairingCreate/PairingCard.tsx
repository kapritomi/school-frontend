import { ArrowDownIcon } from '@/assets/Icons/ArrowDownIcon';
import { ArrowUpIcon } from '@/assets/Icons/ArrowUpIcon';
import { BinIcon } from '@/assets/Icons/BinIcon';
import { useTasks } from '@/store/TasksContext';
import type { PairGroup, TaskJson } from '@/types/tasks';
import { getFieldError } from '@/utils/GetFieldError';
import { MediaUploadButton } from '../MediaUploadButton';
import { useState } from 'react';

type PairingCardProps = {
  item: PairGroup;
  index: number;
  activeTask: {
    id: string | number;
    [key: string]: any; // A többi mező a taskban
  };
  updatePair: (
    index: number,
    field:
      | 'pair_question'
      | 'pair_answer'
      | 'pair_answer_image'
      | 'isExpanded'
      | 'pair_question_image',
    value: string | boolean,
  ) => void;
  removePair: (index: number) => void;
  getMap: () => Map<string, HTMLDivElement>;
};

export const PairingCard = ({
  item,
  index,
  activeTask,

  updatePair,
  removePair,
  getMap,
}: PairingCardProps) => {
  const { worksheetErrors } = useTasks();
  const taskIndex = Number(activeTask.id) - 1;
  const fieldPath = `tasks.${taskIndex}.pairing.pairing_groups.${index}`;
  const hasError = !!(
    worksheetErrors && Object.keys(worksheetErrors).includes(fieldPath)
  );

  const [inputDisabled, setInputDisabled] = useState(false);

  const cardClasses = `
    border w-full flex flex-col gap-[13px] rounded-[5px] text-gray duration-300 transition-all p-4 bg-white
    ${hasError ? 'border-alert border-[2px]' : 'border-secondary'}
    ${item.isExpanded ? 'max-h-[620px]' : 'max-h-[140px] overflow-hidden'}
  `;

  return (
    <div
      ref={(node) => {
        const map = getMap();
        if (node) map.set(String(index), node);
        else map.delete(String(index));
      }}
      id={fieldPath}
      className={cardClasses}
    >
      {/* --- Kártya Header --- */}
      <div className="flex justify-between items-center">
        <p className="text-[22px] font-medium">{index + 1}. Pár</p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => removePair(index)}
            className="hover:opacity-80 rounded-full p-1 transition-opacity hover:bg-red-50"
          >
            <BinIcon color="#FF575A" />
          </button>
          <button
            type="button"
            onClick={() => updatePair(index, 'isExpanded', !item.isExpanded)}
            className="hover:bg-gray-100 p-1 rounded-full transition-colors"
          >
            {item.isExpanded ? <ArrowDownIcon /> : <ArrowUpIcon />}
          </button>
        </div>
      </div>

      {/* --- Kártya Body --- */}
      {item.isExpanded ? (
        <div className="flex flex-col gap-[10px]">
          {/* Kérdés szekció */}
          <div className="flex flex-col gap-[15px]">
            <label className="font-medium">Kérdés vagy leírás</label>
            <textarea
              disabled={inputDisabled}
              maxLength={130}
              value={item.pair_question}
              onChange={(e) =>
                updatePair(index, 'pair_question', e.target.value)
              }
              className="w-full disabled:bg-gray/20 shadow-md resize-none h-[90px] p-4 rounded-[8px] border border-lightBorder outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          {/* Kép szekció */}
          <MediaUploadButton
            id={index}
            itemUrl={item.pair_question_image}
            setInputDisabled={setInputDisabled}
            onUploadSuccess={(url) =>
              updatePair(index, 'pair_question_image', url)
            }
            disabled={item.pair_question ? true : false}
          ></MediaUploadButton>

          {/* Válasz szekció */}
          <div className="flex flex-col gap-[15px]">
            <label className="font-medium">Válasz</label>
            <textarea
              maxLength={130}
              value={item.pair_answer}
              onChange={(e) => updatePair(index, 'pair_answer', e.target.value)}
              className="w-full shadow-md resize-none p-4 h-[90px] rounded-[8px] border border-lightBorder outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          {/* Hibaüzenet megjelenítése */}
          {hasError && (
            <p className="text-[16px] text-alert">
              {getFieldError(worksheetErrors, fieldPath)}
            </p>
          )}
        </div>
      ) : (
        /* Összecsukott állapot */
        <div className="flex text-[16px] flex-col opacity-70">
          {hasError ? (
            <p className="text-[16px] text-alert">
              {getFieldError(worksheetErrors, fieldPath)}
            </p>
          ) : (
            <>
              <p className="w-3/4 truncate font-medium italic">
                {!(item.pair_question || item.pair_question_image) ||
                  'Nincs kérdés vagy kép megadva'}
              </p>
              {item.pair_answer && item.pair_question && (
                <div className="h-[1px] w-8 bg-gray-300 my-1" />
              )}
              <p className="w-3/4 truncate font-medium italic">
                {item.pair_answer || 'Nincs válasz megadva'}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};
