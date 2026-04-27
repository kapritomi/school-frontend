import { useTasks } from '@/store/TasksContext';
import type { PairGroup, TaskJson } from '@/types/tasks';
import { useRef } from 'react';

export const usePairing = () => {
  const { activeTask, updateTask } = useTasks();
  const itemsRef = useRef<Map<string, HTMLDivElement> | null>(null);

  // const pairing = activeTask?.pairing ?? { pairing_groups: [] };
  // const prevLengthRef = useRef(pairing.pairing_groups.length);

  const updatePair = (
    task: TaskJson,
    index: number,
    field:
      | 'pair_question'
      | 'pair_answer'
      | 'pair_answer_image'
      | 'isExpanded'
      | 'pair_question_image',
    value: string | boolean,
  ) => {
    if (!task.pairing) return;
    const nextGroups = task.pairing.pairing_groups.map((p, i) =>
      i === index ? { ...p, [field]: value } : p,
    );
    updateTask({
      ...task,
      pairing: {
        ...task.pairing,
        pairing_groups: nextGroups,
      },
    });
  };

  const removePair = (index: number, task: TaskJson) => {
    if (!task) return;

    const pairing = task?.pairing ?? { pairing_groups: [] };
    updateTask({
      ...task,
      pairing: {
        pairing_groups: pairing.pairing_groups.filter((_, i) => i !== index),
      },
    });
  };

  const addPair = (task: TaskJson) => {
    if (!task) return;
    const pairing = task?.pairing ?? { pairing_groups: [] };
    const newPair: PairGroup = {
      pair_question: '',
      pair_question_image: null,
      pair_answer: '',
      pair_answer_image: null,
      isExpanded: true,
    };

    updateTask({
      ...task,
      pairing: {
        pairing_groups: [...pairing.pairing_groups, newPair],
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
    const container = document.getElementById('scroll-container');
    if (node && container) {
      container.scrollTo({ top: node.offsetTop, behavior: 'smooth' });
    }
  };

  return {
    scrollToId,
    getMap,
    removePair,
    updatePair,
    addPair,
    itemsRef,
  };
};
