import { useTasks } from '@/store/TasksContext';
import { useRef } from 'react';

export const useShortAnswer = () => {
  const itemsRef = useRef<Map<string, HTMLDivElement> | null>(null);
  const { activeTask, updateTask } = useTasks();

  const shortData = activeTask?.short_answer ?? { questions: [] };
  const prevLengthRef = useRef(shortData.questions.length);

  const addQuestion = () => {
    if (!activeTask) return;
    if (shortData.questions.length < 18)
      updateTask({
        ...activeTask,
        short_answer: {
          questions: [
            ...shortData.questions,
            { question: '', answer: '', isExpanded: true },
          ],
        },
      });
  };

  const updateQuestion = (
    index: number,
    field: 'question' | 'answer' | 'isExpanded',
    value: string | boolean,
  ) => {
    const nextQuestions = shortData.questions.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    if (!activeTask) return;
    updateTask({
      ...activeTask,
      short_answer: {
        questions: nextQuestions,
      },
    });
  };

  const removeQuestion = (index: number) => {
    if (!activeTask) return;
    updateTask({
      ...activeTask,
      short_answer: {
        questions: shortData.questions.filter((_, i) => i !== index),
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
    const container = document.getElementById('scroll-container'); // A belső görgethető div ID-ja

    if (node && container) {
      const topPos = node.offsetTop;

      container.scrollTo({
        top: topPos,
        behavior: 'smooth',
      });
    }
  };

  return {
    scrollToId,
    getMap,
    removeQuestion,
    updateQuestion,
    addQuestion,
    prevLengthRef,
    shortData,
  };
};
