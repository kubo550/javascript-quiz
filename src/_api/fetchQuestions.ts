export enum Difficulty {
    easy = "easy",
    medium = "medium",
    hard = "hard",
}

export interface Question {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string,
}

export const fetchQuestions = async (amount: number, difficulty: Difficulty): Promise<Question[]> => {
    const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`);
    const data = await res.json()
    return data.results
}