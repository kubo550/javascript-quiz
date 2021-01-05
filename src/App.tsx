import React, { useEffect, useState } from "react";
import { Container, Grid, Paper, Typography, Button } from "@material-ui/core";
import { Answer, fetchQuestions, QuestionType } from "./_api/fetchQuestions";
import QuestionCard from "./components/QeustionCard/QuestionCard";
import NextButton from "./components/NextButton/NextButton";

const TOTAL_QUESTIONS = 15;

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
      const score = +answer.correct;
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

  if (loading) return <Container> Loading... </Container>;

  return (
    <Container>
      <Grid container spacing={3} justify='center' alignItems='center'>
        <Paper>
          <Typography variant='h5' style={{ marginTop: "20px" }}>
            {number + 1} / {TOTAL_QUESTIONS}
          </Typography>

          <Typography variant='h5' style={{ marginTop: "20px" }}>
            {questions[number].question}
          </Typography>
          <Grid
            container
            spacing={3}
            direction='column'
            justify='center'
            alignItems='center'
            style={{ marginTop: "20px" }}
          >
            <QuestionCard
              question={questions[number]}
              answered={answers.length === number + 1}
              handleClick={callback}
            />
          </Grid>
          {answers.length === number + 1 && answers.length !== TOTAL_QUESTIONS && (
            <NextButton nextQuestion={nextQuestion} />
          )}
          {answers.length === TOTAL_QUESTIONS && (
            <>
              <Typography variant='subtitle1'>
                Your Score {score} / {TOTAL_QUESTIONS}
              </Typography>
              <Button variant='contained' color='primary' onClick={newGame}>
                Restart Game
              </Button>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => setShowAnswers(true)}
              >
                Show Answers
              </Button>
            </>
          )}

          {showAnswers &&
            answers.map((answer, i) => (
              <div key={i}>
                <h4> Question #{i + 1} </h4>

                <img src={questions[i].image} alt='Question' />
                <h5 className={answer.correct ? "correct" : "incorrect"}>
                  Your Answer: {answer.answer}
                </h5>
                <h5>
                  Correct Answer: {questions[i].answers.filter(a => a.correct)[0].answer}
                </h5>
              </div>
            ))}
        </Paper>
      </Grid>
    </Container>
  );
};

export default App;
