import { useMemo, useState, useEffect } from 'react';
import type { TaskJson } from './types/tasks';
type Card = { id: number; name: string };
type Placement = Record<number, number | null>;

const groupColors: Record<number, string> = {
  1: '#FFE4E6', // emlősök
  2: '#DBEAFE', // halak
  3: '#DCFCE7', // madarak
  4: '#FEF3C7', // hüllők
};

function Grouping({ task }: { task: TaskJson }) {
  if (!task.grouping) return null;

  const groups = task.grouping.groups.map((g, index) => ({
    id: index + 1,
    name: g.name,
  }));

  const cards = task.grouping.groups.flatMap((g, gIndex) =>
    g.items.map((item, itemIndex) => ({
      id: gIndex * 100 + itemIndex,
      name: item.name,
    })),
  );

  const initialPlacement: Placement = useMemo(
    () => Object.fromEntries(cards.map((c) => [c.id, null])),
    [cards],
  );
  const [placement, setPlacement] = useState<Placement>(initialPlacement);

  const [draggingId, setDraggingId] = useState<number | null>(null);

  const cardById = useMemo(() => new Map(cards.map((c) => [c.id, c])), [cards]);

  const slotCardIds = (slotId: number) =>
    Object.keys(placement).filter((id) => placement[Number(id)] === slotId);

  const dropToSlot = (slotId: number) => {
    if (!draggingId) return;
    // egy slotba 1 kártya

    setPlacement((prev) => ({ ...prev, [draggingId]: slotId }));
    setDraggingId(null);
  };

  const dropToPool = () => {
    if (!draggingId) return;
    setPlacement((prev) => ({ ...prev, [draggingId]: null }));
    setDraggingId(null);
  };

  const poolCards = cards.filter((c) => placement[c.id] === null);
  useEffect(() => {
    setPlacement(initialPlacement);
  }, [initialPlacement]);
  return (
    <div>
      {/* Csoportok */}
      <div className="flex">
        {groups.map((slot) => {
          const idsInSlot = slotCardIds(slot.id);
          const cardsInSlot = idsInSlot
            .map((id) => cardById.get(Number(id)))
            .filter(Boolean) as Card[];

          return (
            <div
              className="w-full h-[570px] rounded-[8px] p-[5px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
              key={slot.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => dropToSlot(slot.id)}
              style={{
                backgroundColor: groupColors[slot.id],
              }}
            >
              <div className="font-semibold text-[18px] p-2">{slot.name}</div>

              {cardsInSlot.length > 0 ? (
                <div className="flex flex-col gap-2 px-2">
                  {cardsInSlot.map((card) => (
                    <div
                      key={card.id}
                      className=" rounded-[5px] font-semibold text-[18px] p-2"
                      draggable
                      onDragStart={() => setDraggingId(card.id)}
                      onDragEnd={() => setDraggingId(null)}
                      style={{
                        background: 'white',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                        cursor: 'grab',
                        userSelect: 'none',
                      }}
                    >
                      {card.name}
                    </div>
                  ))}
                </div>
              ) : (
                <div />
              )}
            </div>
          );
        })}
      </div>

      {/* Kártyák */}
      <div
        className="pt-6 w-2/5"
        onDragOver={(e) => e.preventDefault()}
        onDrop={dropToPool}
      >
        {poolCards.length === 0 ? (
          <div style={{ opacity: 0.5 }}>Nincs több kártya</div>
        ) : (
          //berakott kártya
          <div className="flex flex-wrap gap-2 px-2 ">
            {poolCards.map((c) => (
              <div
                className="bg-white flex  h-[50px] rounded-[8px] p-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-semibold text-[18px]"
                key={c.id}
                draggable
                onDragStart={() => setDraggingId(c.id)}
                onDragEnd={() => setDraggingId(null)}
                style={{
                  cursor: 'grab',
                  userSelect: 'none',
                }}
              >
                {c.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Grouping;
