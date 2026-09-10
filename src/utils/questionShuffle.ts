export interface ShuffledOptionsData {
  options: string[];
  rawOptions: string[];
  correctIndex: number;
  correctOptionWithPrefix: string;
  correctRawText: string;
  originalIndices: number[];
}

const LETTER_PREFIXES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export function cleanOptionPrefix(text: string): string {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/^\s*(?:\[?[A-Ha-h0-9][\)\.\:\-\]]|\([A-Ha-h0-9]\))\s*/, '')
    .trim();
}

export function fisherYatesShuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function shuffleQuestionOptions(
  rawOptions: string[] | undefined | null,
  correctIdentifier: number | string
): ShuffledOptionsData {
  if (!rawOptions || !Array.isArray(rawOptions) || rawOptions.length === 0) {
    return {
      options: [],
      rawOptions: [],
      correctIndex: 0,
      correctOptionWithPrefix: '',
      correctRawText: '',
      originalIndices: [],
    };
  }

  let originalCorrectIndex = 0;

  if (typeof correctIdentifier === 'number') {
    originalCorrectIndex = Math.max(0, Math.min(correctIdentifier, rawOptions.length - 1));
  } else if (typeof correctIdentifier === 'string') {
    const cleanTarget = cleanOptionPrefix(correctIdentifier).toLowerCase();
    const letterMatch = correctIdentifier.trim().match(/^([A-Ea-e])[\)\.\:\-\s]/);

    let foundIdx = -1;

    for (let i = 0; i < rawOptions.length; i++) {
      const cleanOpt = cleanOptionPrefix(rawOptions[i]).toLowerCase();
      if (cleanOpt === cleanTarget || (cleanTarget && cleanOpt.includes(cleanTarget)) || (cleanTarget && cleanTarget.includes(cleanOpt))) {
        foundIdx = i;
        break;
      }
    }

    if (foundIdx === -1 && letterMatch) {
      const letter = letterMatch[1].toUpperCase();
      const letterIdx = LETTER_PREFIXES.indexOf(letter);
      if (letterIdx >= 0 && letterIdx < rawOptions.length) {
        foundIdx = letterIdx;
      }
    }

    originalCorrectIndex = foundIdx !== -1 ? foundIdx : 0;
  }

  const items = rawOptions.map((opt, origIdx) => {
    const cleanText = cleanOptionPrefix(opt);
    return {
      origIdx,
      cleanText: cleanText || opt,
      isCorrect: origIdx === originalCorrectIndex,
    };
  });

  const shuffledItems = fisherYatesShuffle(items);

  const formattedOptions: string[] = [];
  const rawCleanOptions: string[] = [];
  const originalIndices: number[] = [];
  let newCorrectIndex = 0;
  let correctRawText = '';
  let correctOptionWithPrefix = '';

  shuffledItems.forEach((item, newIdx) => {
    const letter = LETTER_PREFIXES[newIdx] || `${newIdx + 1}`;
    const formatted = `${letter}) ${item.cleanText}`;

    formattedOptions.push(formatted);
    rawCleanOptions.push(item.cleanText);
    originalIndices.push(item.origIdx);

    if (item.isCorrect) {
      newCorrectIndex = newIdx;
      correctRawText = item.cleanText;
      correctOptionWithPrefix = formatted;
    }
  });

  return {
    options: formattedOptions,
    rawOptions: rawCleanOptions,
    correctIndex: newCorrectIndex,
    correctOptionWithPrefix,
    correctRawText,
    originalIndices,
  };
}

export function checkAnswerCorrectness(
  userSelection: number | string | null | undefined,
  shuffledData: ShuffledOptionsData
): boolean {
  if (userSelection === null || userSelection === undefined) return false;

  if (typeof userSelection === 'number') {
    return userSelection === shuffledData.correctIndex;
  }

  if (typeof userSelection === 'string') {
    const cleanUser = cleanOptionPrefix(userSelection).trim().toLowerCase();
    const cleanCorrect = shuffledData.correctRawText.trim().toLowerCase();
    if (cleanUser && cleanCorrect && cleanUser === cleanCorrect) return true;

    if (userSelection.trim() === shuffledData.correctOptionWithPrefix.trim()) return true;

    const letterMatch = userSelection.trim().match(/^([A-Ea-e])/);
    if (letterMatch) {
      const letter = letterMatch[1].toUpperCase();
      const letterIdx = LETTER_PREFIXES.indexOf(letter);
      return letterIdx === shuffledData.correctIndex;
    }
  }

  return false;
}
