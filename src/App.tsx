import React, { useEffect, useState } from "react";
import { Container, Grid, Paper, Typography, Button } from "@material-ui/core";
import { Answer, fetchQuestions, QuestionType } from "./_api/fetchQuestions";
import QuestionCard from "./components/QeustionCard/QuestionCard";

const TOTAL_QUESTIONS = 3;

const App = () => {
  const [playable, setPlayable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    (async () => {
      const questions = await fetchQuestions();
      setQuestions(questions);
      setLoading(false);
    })();
  }, []);

  const callback = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (playable) {
      const answerText = e.currentTarget.value;
      const answer = questions[number].answers.filter(q => q.answer === answerText)[0];
      setAnswers(prev => [...prev, answer]);
      const score = answer.correct ? 1 : 0;
      setScore(prev => prev + score);
    }
  };

  const nextQuestion = () => {
    if (number < questions.length - 1) {
      setNumber(prev => ++prev);
    }
  };

  const newGame = () => {
    setAnswers([]);
    setPlayable(true);
    setNumber(0);
    setScore(0);
    setShowAnswers(false);
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
            <QuestionCard question={questions[number]} handleClick={callback} />
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
