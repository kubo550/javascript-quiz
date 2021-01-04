import { suffleArray } from "./utils/shuffleArray";

export interface Answer {
    correct: boolean,
    answer: string
}

export interface QuestionType {
    _id: number,
    explanationLink: string,
    image: string,
    answers: Answer[],
    question: string
}


export const fetchQuestions = async () => {

    const endpoint = `https://quiz-questions.free.beeceptor.com/`
    const res = await fetch(endpoint);
    const data: QuestionType[] = await res.json()


    return data
}