import React, { useEffect, useState } from "react";
import { Container, Grid, Paper, Typography, Button } from "@material-ui/core";
import { fetchQuestions, QuestionType } from "./_api/fetchQuestions";
import QuestionCard from "./components/QeustionCard/QuestionCard";

const TOTAL_QUESTIONS = 3;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [answers, setAnswers] = useState<QuestionType[]>([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    (async () => {
      const questions = await fetchQuestions();
      setQuestions(questions);
      setLoading(false);
    })();
  }, []);

  const nextQuestion = () => {
    if (number < questions.length - 1) {
      setNumber(prev => ++prev);
    }
  };

  if (loading) return <Container> Loading </Container>;

  return (
    <Container>
      <Grid container spacing={3} justify='center' alignItems='center'>
        <Paper>
          <Typography variant='h4'> {questions[number].question} </Typography>
          <Grid
            container
            spacing={3}
            direction='column'
            justify='center'
            alignItems='center'
          >
            <div>
              <img src={questions[number].image} alt='Quiz Question' />
            </div>
            <QuestionCard question={questions[number]} />
          </Grid>
          <Button variant='outlined' color='secondary' onClick={nextQuestion}>
            next question
          </Button>
        </Paper>
      </Grid>
    </Container>
  );
};

export default App;
