import React, { FC } from "react";
import { QuestionType } from "../_api/fetchQuestions";

interface QuestionCardProps {
  question: QuestionType;
  number: number;
  totalQuestions: number;
  isAnswered: boolean;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  nextQuestion: () => void;
}

const QuestionCard: FC<QuestionCardProps> = ({
  question,
  number,
  totalQuestions,
  isAnswered,
  callback,
  nextQuestion,
}) => {
  return (
    <div>
      <h3>
        Question {number + 1} / {totalQuestions}
      </h3>
      <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
      <p>{question.category} </p>
      <div>
        {question.answers.map(answer => (
          <button
            key={answer.answer}
            value={answer.answer}
            disabled={isAnswered}
            onClick={e => callback(e)}
          >
            {answer.answer}
          </button>
        ))}
      </div>
      {isAnswered && number + 1 < totalQuestions && (
        <button onClick={nextQuestion}>Next Question</button>
      )}
    </div>
  );
};

export default QuestionCard;
