import React, { FC } from "react";
import { QuestionType } from "../../_api/fetchQuestions";
import { Grid, Button } from "@material-ui/core";

interface QuestionCardProps {
  question: QuestionType;
}

const QuestionCard: FC<QuestionCardProps> = ({ question }) => {
  return (
    <Grid container spacing={3}>
      {question.answers.map((question, i) => (
        <Grid key={i} item xs={12} sm={6}>
          <Button color='primary' variant='contained' fullWidth value={question.answer}>
            {question.answer}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default QuestionCard;
