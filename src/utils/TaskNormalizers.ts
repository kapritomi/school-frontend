export interface NormalizedPair {
  id: number;
  question: string;
  answer: string;
  questionImg: string | null;
  answerImg: string | null;
}

export interface NormalizeQuestions {
  question: string;
  img: string;
  id: number;
}

export interface NormalizedGrouping {
  groups: { id: number; name: string }[];
  cards: { id: number; name: string; imgURL: string | null; groupId: number }[];
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

export const normalizeShortAnswerData = (
  task: any,
  dataType: 'frontend' | 'backend',
): NormalizeQuestions[] => {
  if (dataType === 'frontend') {
    const questions = task.short_answer.questions;
    return questions.map((item: any, index: number) => ({
      id: index,
      img: item.question_image,
      question: item.question,
    }));
  } else {
    const questions = task.questionsOrImages;

    return questions.map((item: any) => ({
      id: item.id,
      question: item.question,
      img: item.img,
    }));
  }
};

export const normalizeGroupingData = (
  task: any,
  dataType: 'frontend' | 'backend',
): NormalizedGrouping => {
  if (dataType === 'frontend') {
    const frontendGroups = task.grouping?.groups || [];

    const groups = frontendGroups.map((g: any, index: number) => ({
      id: g.id || index + 1,
      name: g.name,
    }));

    const cards = frontendGroups.flatMap((g: any, gIndex: number) =>
      (g.items || []).map((item: any, itemIndex: number) => ({
        id: gIndex * 100 + itemIndex,
        name: item.name,
        imgURL: item.imgURL || null,
        groupId: g.id || gIndex + 1,
      })),
    );

    return { groups, cards };
  } else {
    const backendGroups = task.groups || [];
    const backendItems = task.group_items || [];

    const groups = backendGroups.map((g: any) => ({
      id: g.id,
      name: g.name,
    }));

    const cards = backendItems.map((item: any) => ({
      id: item.id,
      name: item.name,
      imgURL: item.imgURL || null,
      groupId: item.group_id || 0,
    }));

    return { groups, cards };
  }
};
