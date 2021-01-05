import { Answer } from "../fetchQuestions";

export const suffleArray = (arr: Answer[]) => {
    let count = arr.length;
    while (count) {
        const index = Math.floor(Math.random() * count--);
        [arr[count], arr[index]] = [arr[index], arr[count]];
    }
    return arr;
};