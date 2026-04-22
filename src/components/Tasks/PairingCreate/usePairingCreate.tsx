import { useTasks } from '@/store/TasksContext';
import { useRef } from 'react';

export const usePairingCreate = () => {
  const { activeTask, updateTask } = useTasks();

  const itemsRef = useRef<Map<string, HTMLDivElement> | null>(null);

  const task = activeTask;
  const pairing = task?.pairing ?? { pairing_groups: [] };

  const prevLengthRef = useRef(pairing.pairing_groups.length);

  function getMap() {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  const scrollToId = (id: string) => {
    const map = getMap();
    const node = map.get(id);
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const addPair = () => {
    if (task && pairing.pairing_groups.length < 8) {
      updateTask({
        ...task,
        pairing: {
          pairing_groups: [
            ...pairing.pairing_groups,
            {
              pair_question: '',
              pair_answer_image: '',
              pair_question_image: '',
              pair_answer: '',
              isExpanded: true,
            },
          ],
        },
      });
    }
  };

  const removePair = (index: number) => {
    if (!task) return;
    updateTask({
      ...task,
      pairing: {
        pairing_groups: pairing.pairing_groups.filter((_, i) => i !== index),
      },
    });
  };

  const updatePair = (
    index: number,
    field:
      | 'pair_question'
      | 'pair_answer'
      | 'pair_answer_image'
      | 'isExpanded'
      | 'pair_question_image',
    value: string | boolean,
  ) => {
    if (!task) return;
    const next = pairing.pairing_groups.map((p, i) =>
      i === index ? { ...p, [field]: value } : p,
    );
    updateTask({ ...task, pairing: { pairing_groups: next } });
  };

  return {
    itemsRef,
    prevLengthRef,
    pairing,
    getMap,
    addPair,
    removePair,
    updatePair,
    task,
    scrollToId,
    updateTask,
  };
};
