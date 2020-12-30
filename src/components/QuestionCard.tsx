import React, { FC } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
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
    <Grid>
      <Typography variant='h5'>
        Question {number + 1} / {totalQuestions}
      </Typography>
      <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
      <p>{question.category} </p>
      <Grid container spacing={3}>
        {question.answers.map(answer => (
          <Grid item key={answer.answer} xs={12} sm={6} md={6}>
            <Button
              variant='outlined'
              color='primary'
              fullWidth
              value={answer.answer}
              disabled={isAnswered}
              onClick={e => callback(e)}
            >
              {answer.answer}
            </Button>
          </Grid>
        ))}
      </Grid>
      {isAnswered && number + 1 < totalQuestions && (
        <Grid container direction='row' justify='flex-end' alignItems='center'>
          <Button variant='contained' color='primary' onClick={nextQuestion}>
            Next Question
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default QuestionCard;
