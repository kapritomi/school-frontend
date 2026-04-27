import { useTasks } from '@/store/TasksContext';
import type { TaskJson } from '@/types/tasks';
import { useRef } from 'react';

export const useShortAnswer = () => {
  const itemsRef = useRef<Map<string, HTMLDivElement> | null>(null);
  const { updateTask } = useTasks();

  const addQuestion = (task: TaskJson) => {
    if (!task) return;
    const shortData = task?.short_answer ?? { questions: [] };

    if (shortData.questions.length < 18)
      updateTask({
        ...task,
        short_answer: {
          questions: [
            ...shortData.questions,
            {
              question: '',
              question_image: null,
              answer: '',
              isExpanded: true,
            },
          ],
        },
      });
  };

  const updateQuestion = (
    task: TaskJson,
    index: number,
    field: 'question' | 'answer' | 'isExpanded' | 'question_image',
    value: string | boolean,
  ) => {
    const shortData = task?.short_answer ?? { questions: [] };
    const nextQuestions = shortData.questions.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    if (!task) return;
    updateTask({
      ...task,
      short_answer: {
        questions: nextQuestions,
      },
    });
  };

  const removeQuestion = (index: number, task: TaskJson) => {
    if (!task) return;
    const shortData = task?.short_answer ?? { questions: [] };
    updateTask({
      ...task,
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
  };
};
