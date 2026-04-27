export interface NormalizedPair {
  id: number;
  question: string;
  answer: string;
  questionImg: string | null;
  answerImg: string | null;
}

export const normalizePairingData = (
  task: any,
  dataType: 'frontend' | 'backend',
): NormalizedPair[] => {
  if (dataType === 'frontend') {
    const groups = task.pairing?.pairing_groups || [];
    return groups.map((g: any, index: number) => ({
      id: index,
      question: g.pair_question || '',
      answer: g.pair_answer || '',
      questionImg: null,
      answerImg: null,
    }));
  } else {
    const questions = task.pairQuestions || [];
    const answers = task.pairAnswers || [];

    return questions.map((q: any, index: number) => {
      const a = answers[index] || {}; // Megkeressük a párját index alapján
      return {
        id: q.id || index,
        question: q.question || '',
        answer: a.answer || '',
        questionImg: q.img || null,
        answerImg: a.img || null,
      };
    });
  }
};
