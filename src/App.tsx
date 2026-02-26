import { useMemo, useState } from 'react'

  type Card = { id: number; answer: string; img: string | null };
  type Slot = { id: number; question: string; img: string | null};
  
  type Placement = Record<number, number | null>;


  const taskData = {
    task_title: "Magnam.",
    task_description: "Quia aut eaque dolor numquam.",
    task_type: "pairing",
    feedback: "et",
    pairQuestions: [
      {
        id: 1,
        question: "Et nam accusantium consequuntur voluptatibus doloremque dolorum.",
        img: null
      },
      {
          "id": 2,
          "question": "Numquam recusandae mollitia blanditiis fugit voluptas est.",
          "img": null
      },
      {
          "id": 3,
          "question": "Corrupti ea in quia. Molestiae porro nemo fuga.",
          "img": null
      },
      {
          "id": 4,
          "question": "Nihil quisquam architecto iusto architecto nam ut maxime. Neque numquam iure totam adipisci cum pariatur quas.",
          "img": null
      },
      {
          "id": 5,
          "question": "Eligendi ea consequatur quia magnam et eveniet. Minima quia velit deleniti eius modi eligendi eum.",
          "img": null
      },
      {
          "id": 6,
          "question": "Officiis eveniet dolor cumque ratione pariatur molestias. Laboriosam nulla beatae sed est inventore maiores.",
          "img": null
      },
      {
          "id": 7,
          "question": "Ab sint eum illo.",
          "img": null
      },
      {
          "id": 8,
          "question": "Ut aliquid suscipit veritatis sed consequatur asperiores illo dolores.",
          "img": null
      }
    ],
    pairAnswers: [
      {
        id: 1,
        answer: "Excepturi commodi quaerat quibusdam.",
        img: null
      },
      {
          "id": 2,
          "answer": "Et deserunt fugiat excepturi et.",
          "img": null
      },
      {
          "id": 3,
          "answer": "Nihil quia reprehenderit eos at veritatis aliquam deleniti. Est numquam qui amet.",
          "img": null
      },
      {
          "id": 4,
          "answer": "Necessitatibus est eius et animi totam facere fugit.",
          "img": null
      },
      {
          "id": 5,
          "answer": "Odit et cupiditate quibusdam illum minima unde. Et vel quaerat similique sequi officiis ad hic.",
          "img": null
      },
      {
          "id": 6,
          "answer": "Quos facilis numquam fugit asperiores illo eum.",
          "img": null
      },
      {
          "id": 7,
          "answer": "Ratione et nesciunt eum et inventore eos odio. Eos aliquam et autem quidem inventore eos quisquam.",
          "img": null
      },
      {
          "id": 8,
          "answer": "Sint perferendis sed aut. In nostrum ipsum libero odio.",
          "img": null
      }
    ]
  }
  const slots: Slot[] = taskData.pairQuestions.map((q) => ({
    id: q.id,
    question: q.question,
    img: q.img,
  }));
  const cards: Card[] = taskData.pairAnswers.map((a) => ({
    id: a.id,
    answer: a.answer,
    img: a.img,
  }));
  const initialPlacement: Placement = Object.fromEntries(
  cards.map((c) => [c.id, null])
);

function App() {
  //Kártyák helyzete, null = poolban van
   const [placement, setPlacement] = useState<Placement>(initialPlacement);

  //Épp melyik kártyát húzod
  const [draggingId, setDraggingId] = useState<number | null>(null);


  const cardById = useMemo(() => new Map(cards.map((c) => [c.id, c])), []);

  const slotCardId = (slotId: number) =>
    Object.keys(placement).find((id) => placement[Number(id)] === slotId) ?? null;

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

  return (
    <div className='bg-gradient-to-r from-[#E8F7EC] to-[#F0F9FF] h-full flex flex-wrap '>
      {/* felső rész: slotok */}
      <div className='grid grid-cols-2 relative w-3/5 gap-y-4 gap-x-12 pt-16 pl-16 pr-12'>

       <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[85%] w-[5px] bg-white" />
        {slots.map((slot) => {
          const idInSlot = slotCardId(slot.id);
          const card = idInSlot ? cardById.get(Number(idInSlot)) : null;

          return (
            <div className='bg-white flex w-full h-[200px] rounded-[8px] p-[5px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
              key={slot.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => dropToSlot(slot.id)}
              
            >
              <div className='w-1/2' style={{ fontWeight: 700 }}>{slot.question}</div>

              {card ? (
                
                <div className='w-1/2 rounded-[5px]'
                  draggable
                  onDragStart={() => setDraggingId(card.id)}
                  onDragEnd={() => setDraggingId(null)}
                  style={{
                    background: "white",
                    border: !card
                    ? "2px dashed gray"
                    : !checked
                    ? "2px solid transparent"
                    : isCardCorrect(card.id)
                    ? "2px solid green"
                    : "2px solid red",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                    cursor: "grab",
                    userSelect: "none",
                  }}
                >
                  {card.answer}
                </div>
              ) : (
                <div className='bg-[#EDEDED] w-[250px] rounded-[5px] shadow-[inset_0_2.21px_8px_rgba(0,0,0,0.25)]'></div>
              )}
            </div>
          );
        })}
      </div>
        
      {/* alsó rész: nagy összesített mező (pool) */}
      <div className='pt-[60px] w-2/5'
        onDragOver={(e) => e.preventDefault()}
        onDrop={dropToPool}
      >
        {poolCards.length === 0 ? (
          <div style={{ opacity: 0.5 }}>Nincs több kártya</div>
        ) : (
          //berakott kártya
          <div className='flex flex-wrap gap-16 px-10 justify-center'>
            {poolCards.map((c) => (
              <div
                className='bg-white flex w-[250px] h-[190px] rounded-[8px] p-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
                key={c.id}
                draggable
                onDragStart={() => setDraggingId(c.id)}
                onDragEnd={() => setDraggingId(null)}
                style={{
                  cursor: "grab",
                  userSelect: "none",
                }}
              >
                {c.answer}
              </div>
            ))}
          </div>
        )}


        <div>
        <button 
          className='fixed bottom-4 right-[10px] bg-[#2E6544] text-white font-bold rounded-[8px] px-4 py-2 shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
          onClick={() => setChecked(true)}>
            Ellenőrzés
        </button>
      </div>
        
      </div>

      
    </div>
  )
}

export default App
