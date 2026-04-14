import { useMemo, useState } from 'react';
import type { TaskJson } from './types/tasks';

type Card = { id: number; answer: string; img: string | null };
type Slot = { id: number; question: string; img: string | null };
type Placement = Record<number, number | null>;

function Pairing({ task }: { task: TaskJson }) {
  if (!task.pairing) return null;
  const slots: Slot[] = task.pairing.pairing_groups.map((q) => ({
    id: q.pair_question.length, // vagy q.id, ha van
    question: q.pair_question,
    img: null,
  }));

  const cards: Card[] = task.pairing.pairing_groups.map((a) => ({
    id: a.pair_answer.length, // vagy a.id
    answer: a.pair_answer,
    img: null,
  }));
  const shuffle = <T,>(array: T[]): T[] =>
    [...array].sort(() => Math.random() - 0.5);
  const shuffledCards = useMemo(() => shuffle(cards), [task]);

  const initialPlacement: Placement = useMemo(
    () => Object.fromEntries(shuffledCards.map((c) => [c.id, null])),
    [shuffledCards],
  );

  //Kártyák helyzete, null = poolban van
  const [placement, setPlacement] = useState<Placement>(initialPlacement);
  //minden hibátlan üzenet
  const [success, setSuccess] = useState(false);
  //Épp melyik kártyát húzod
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const cardById = useMemo(() => new Map(cards.map((c) => [c.id, c])), []);

  const slotCardId = (slotId: number) =>
    Object.keys(placement).find((id) => placement[Number(id)] === slotId) ??
    null;

  const slotHasCard = (slotId: number) =>
    Object.values(placement).some((s) => s === slotId);

  const dropToSlot = (slotId: number) => {
    if (!draggingId) return;
    if (slotHasCard(slotId)) return; // egy slotba 1 kártya

    setPlacement((prev) => ({ ...prev, [draggingId]: slotId }));
    setDraggingId(null);

    setChecked(false);
  };

  const dropToPool = () => {
    if (!draggingId) return;
    setPlacement((prev) => ({ ...prev, [draggingId]: null }));
    setDraggingId(null);

    setChecked(false);
  };

  const poolCards = cards.filter((c) => placement[c.id] === null);

  //Ellenőrzés gomb
  const [checked, setChecked] = useState(false);
  const cardMap = useMemo(() => new Map(cards.map((c) => [c.id, c])), [cards]);
  const slotMap = useMemo(() => new Map(slots.map((s) => [s.id, s])), [slots]);
  const isCardCorrect = (cardId: number) => {
    const slotId = placement[cardId];
    if (!slotId) return false;
    return cardMap.get(cardId)?.id === slotMap.get(slotId)?.id;
  };
  //Ellenőrzés hogy minden jó
  const checkAllCorrect = () => {
    const allCorrect = cards.every((card) => isCardCorrect(card.id));

    setSuccess(allCorrect);
    setChecked(true); // ha használod a keretezéshez
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

      <div className="flex flex-wrap">
        {/* bal rész: slotok */}
        <div className="grid grid-cols-2 relative w-3/5 gap-y-4 gap-x-8 task-padding pr-12">
          {/* fehér választóvonal a 2 rész közé*/}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[85%] w-[5px] bg-white" />

          {slots.map((slot) => {
            const idInSlot = slotCardId(slot.id);
            const card = idInSlot ? cardById.get(Number(idInSlot)) : null;

            return (
              <div
                className="bg-white flex w-full h-[200px] rounded-[8px] p-[5px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                key={slot.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => dropToSlot(slot.id)}
              >
                <div className="w-1/2 font-semibold text-[18px] p-2">
                  {slot.question}
                </div>

                {card ? (
                  <div
                    className="w-1/2 rounded-[5px] font-semibold text-[18px] p-2"
                    draggable
                    onDragStart={() => setDraggingId(card.id)}
                    onDragEnd={() => setDraggingId(null)}
                    style={{
                      background: 'white',
                      border: !card
                        ? '2px dashed transparent'
                        : !checked
                          ? '2px solid transparent'
                          : isCardCorrect(card.id)
                            ? '2px solid green'
                            : '2px solid red',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                      cursor: 'grab',
                      userSelect: 'none',
                    }}
                  >
                    {card.answer}
                  </div>
                ) : (
                  <div className="bg-[#EDEDED] w-[250px] rounded-[5px] shadow-[inset_0_2.21px_8px_rgba(0,0,0,0.25)]"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* jobb rész: nagy összesített mező (pool) */}
        <div
          className="pt-6 w-2/5"
          onDragOver={(e) => e.preventDefault()}
          onDrop={dropToPool}
        >
          {poolCards.length === 0 ? (
            <div style={{ opacity: 0.5 }}>Nincs több kártya</div>
          ) : (
            //berakott kártya
            <div className="flex flex-wrap gap-8 px-10 justify-center">
              {poolCards.map((c) => (
                <div
                  className="bg-white flex w-[250px] h-[190px] rounded-[8px] p-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-semibold text-[18px]"
                  key={c.id}
                  draggable
                  onDragStart={() => setDraggingId(c.id)}
                  onDragEnd={() => setDraggingId(null)}
                  style={{
                    cursor: 'grab',
                    userSelect: 'none',
                  }}
                >
                  {c.answer}
                </div>
              ))}
            </div>
          )}
          {success && (
            <div className="mt-4 text-green-600 font-bold text-xl">
              ✅ Siker! Minden válasz helyes!
            </div>
          )}

          <div>
            <button
              className="fixed bottom-4 right-[10px] bg-[#2E6544] text-white font-bold rounded-[8px] px-4 py-2 shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
              onClick={() => {
                setChecked(true);
                checkAllCorrect();
              }}
            >
              Ellenőrzés
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pairing;
