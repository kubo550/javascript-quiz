import React, { FC } from "react";
import { QuestionType } from "../../_api/fetchQuestions";
import { Grid, Button } from "@material-ui/core";

interface QuestionCardProps {
  question: QuestionType;
  answered: boolean;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const QuestionCard: FC<QuestionCardProps> = ({ question, handleClick, answered }) => {
  return (
    <Grid container spacing={3} justify='center' alignItems='center'>
      <img src={question.image} style={{ maxWidth: "98%" }} alt='Question' />
      {question.answers.map((question, i) => (
        <Grid key={i} item xs={12} sm={6}>
          <Button
            color='primary'
            variant='contained'
            fullWidth
            disabled={answered}
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
