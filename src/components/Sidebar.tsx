import React, { useState } from 'react';
import type { TaskType } from '../types/tasks';
import { useTasks } from '../store/TasksContext';
import { Link } from 'react-router-dom';
type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { slots, createTask, removeTask, reorderSlots } = useTasks();

  const taskCards: { type: TaskType; title: string }[] = [
    { type: 'pair', title: 'Párkereső' },
    { type: 'grouping', title: 'Csoportba rendezés' },
    { type: 'assignment', title: 'Hozzárendelés képeken' },
    { type: 'short', title: 'Rövid válasz' },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [newLabel, setNewLabel] = useState('');
  const [selectedType, setSelectedType] = useState<TaskType | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const taskCount = slots.filter(Boolean).length;
  const canAddMore = taskCount < 10;
  const firstEmptyIndex = slots.findIndex((s) => s === null);

  const onDragStart = (index: number) => (e: React.DragEvent) => {
    if (slots[index] === null) {
      e.preventDefault();
      return;
    }

    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('slotIndex', String(index));
  };

  const onDragOver = (index: number) => (e: React.DragEvent) => {
    e.preventDefault();
    setOverIndex(index);
    e.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (index: number) => (e: React.DragEvent) => {
    e.preventDefault();

    const from = Number(e.dataTransfer.getData('slotIndex'));
    const to = index;

    setDragIndex(null);
    setOverIndex(null);

    if (Number.isNaN(from)) return;
    if (from === to) return;

    reorderSlots(from, to);
  };

  const onDragEnd = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  const confirmCreate = () => {
    if (pendingIndex === null) return;

    const label = newLabel.trim();
    if (!label || !selectedType) return;

    createTask(pendingIndex, label, selectedType);

    setIsModalOpen(false);
    setPendingIndex(null);
    setNewLabel('');
    setSelectedType(null);
  };

  const cancelCreate = () => {
    setIsModalOpen(false);
    setPendingIndex(null);
    setNewLabel('');
    setSelectedType(null);
  };

  return (
    <div className="h-full">
      <aside
        className={`bg-white w-[240px] h-full shadow-[6px_4px_4px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="text-[22px] font-medium pl-3 pt-5">Feladatsorod:</div>

        <button
          className="absolute top-5 -right-10 w-10 h-10 bg-white shadow-[6px_4px_4px_rgba(0,0,0,0.25)] rounded-r-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <p>🡰</p> : <p>🡲</p>}
        </button>

        <div className="flex flex-col gap-3 p-3">
          {slots.map((slot, idx) => {
            const isOver =
              overIndex === idx && dragIndex !== null && dragIndex !== idx;

            if (slot) {
              return (
                <div
                  key={idx}
                  className="group select-none border-[2px] border-primary rounded-[8px] cursor-grab"
                  draggable
                  onClick={() => {
                    const el = document.getElementById(`task-${slot.id}`);
                    if (el) {
                      el.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      });
                    }
                  }}
                  onDragStart={onDragStart(idx)}
                  onDragOver={onDragOver(idx)}
                  onDrop={onDrop(idx)}
                  onDragEnd={onDragEnd}
                  style={{
                    background: isOver ? '#f2f2f2' : '#fff',
                  }}
                >
                  <div className="flex flex-wrap">
                    <div className="w-full pl-2">
                      <span className="text-[15px] font-medium text-secondaryFont">
                        {idx + 1}.{' '}
                        {slot.type === 'assignment'
                          ? 'Hozzárendelés képeken'
                          : slot.type === 'grouping'
                            ? 'Csoportba rendezés'
                            : slot.type === 'pair'
                              ? 'Párkereső'
                              : slot.type === 'short'
                                ? 'Rövid válasz'
                                : ''}
                      </span>
                    </div>

                    <div className="flex justify-between items-center w-full">
                      <div className="ml-6 text-[15px] text-gray">
                        {slot.label}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTask(slot.id);
                        }}
                        className="ml-2 mr-1 px-1 text-white bg-delete rounded-[5px] text-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                      >
                        Törlés
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            if (canAddMore && idx === firstEmptyIndex) {
              return (
                <button
                  key={idx}
                  className="select-none rounded-[8px]"
                  type="button"
                  onClick={() => {
                    setPendingIndex(idx);
                    setNewLabel('');
                    setIsModalOpen(true);
                    setSelectedType(null);
                  }}
                  onDragOver={onDragOver(idx)}
                  onDrop={onDrop(idx)}
                  onDragEnd={onDragEnd}
                  style={{
                    height: 44,
                    width: '100%',
                    border: '2px dashed #8FBF6D',
                  }}
                >
                  +
                </button>
              );
            }

            return null;
          })}
        </div>
        <div className="text-[22px] font-medium pl-3 pt-5"> Beállítások: </div>
        <Link to={'/taskPreview'}>
          <span className="pl-3 pt-5">Előnézet</span>
        </Link>
      </aside>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onMouseDown={cancelCreate}
        >
          {' '}
          <div className="absolute inset-0 bg-black/40" />{' '}
          <div
            className="relative z-10 w-[820px] rounded-xl bg-white p-4 shadow-lg"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {' '}
            <div className="text-lg font-medium mb-3">
              {' '}
              Új feladat létrehozása{' '}
            </div>{' '}
            <input
              className="w-full border-[1px] focus:border-primary focus:border-[2.5px] border-lightBorder rounded-lg px-3 py-2 outline-none"
              placeholder="Feladat címe"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') confirmCreate();
                if (e.key === 'Escape') cancelCreate();
              }}
              autoFocus
            />{' '}
            <div className="flex gap-2 mt-2">
              {' '}
              {taskCards.map((c) => {
                const selected = selectedType === c.type;
                return (
                  <button
                    key={c.type}
                    type="button"
                    onClick={() => setSelectedType(c.type)}
                    className={[
                      'rounded-[8px]  bg-white w-1/4 shadow-[4px_8px_6px_rgba(0,0,0,0.25)] border-[1px] border-lightBorder',
                      'flex flex-col justify-between',
                      'h-[200px] p-2',
                      selected
                        ? 'ring-2 ring-green-700 border-green-700'
                        : 'hover:ring-1 hover:ring-gray-300',
                    ].join(' ')}
                  >
                    {' '}
                    <div className="h-[140px] rounded-[8px] border-[1px] border-lightBorder bg-white" />{' '}
                    <div className="mt-2">{c.title}</div>{' '}
                  </button>
                );
              })}{' '}
            </div>{' '}
            <div className="flex justify-end gap-2 mt-4">
              {' '}
              <button
                type="button"
                className="px-3 py-2 rounded-lg border border-lightBorder"
                onClick={cancelCreate}
              >
                {' '}
                Mégse{' '}
              </button>{' '}
              <button
                type="button"
                className="px-3 py-2 rounded-lg disabled:bg-primaryDisabled bg-primary text-white font-semibold"
                onClick={confirmCreate}
                disabled={!newLabel.trim() || !selectedType}
              >
                {' '}
                Létrehozás{' '}
              </button>{' '}
            </div>{' '}
          </div>{' '}
        </div>
      )}
    </div>
  );
}
