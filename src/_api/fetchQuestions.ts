import { suffleArray } from "./utils/shuffleArray";

export enum Difficulty {
    easy = "easy",
    medium = "medium",
    hard = "hard",
}

interface Question {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string,
}

export type Answer = {
    answer: string,
    correct: boolean
}

export type QuestionType = Question & { answers: Answer[] }

export const fetchQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionType[]> => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    const res = await fetch(endpoint);
    const data = await res.json()
    const questions: QuestionType[] = (data.results as Question[]).map(
        (question) => ({
            ...question,
            answers: suffleArray([
                question.correct_answer,
                ...question.incorrect_answers
            ]).map((answer) => ({
                answer,
                correct: answer === question.correct_answer
            }))
        })
    );

    return questions
}