import React, { FC } from "react";
import { QuestionType } from "../../_api/fetchQuestions";
import { Grid, Button } from "@material-ui/core";

interface QuestionCardProps {
  question: QuestionType;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const QuestionCard: FC<QuestionCardProps> = ({ question, handleClick }) => {
  return (
    <Grid container spacing={3}>
      <img src={question.image} alt='Question Image' />
      {question.answers.map((question, i) => (
        <Grid key={i} item xs={12} sm={6}>
          <Button
            color='primary'
            variant='contained'
            fullWidth
            value={question.answer}
            onClick={e => handleClick(e)}
          >
            {question.answer}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default QuestionCard;
