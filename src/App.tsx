import React, { useEffect, useState } from "react";
import { Container, Grid, Paper, Typography, Button } from "@material-ui/core";
import { Answer, fetchQuestions, QuestionType } from "./_api/fetchQuestions";
import QuestionCard from "./components/QeustionCard/QuestionCard";
import NextButton from "./components/NextButton/NextButton";
import Stepps from "./components/Stepps/Stepps";
import Results from "./components/Results/Results";

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
  useEffect(() => {
    if (answers.length === TOTAL_QUESTIONS) {
      setPlayable(false);
    }
  }, [number, answers.length]);

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
      <Paper
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "20px 30px",
          boxShadow: "0px 0px 10px 1px #000",
          minHeight: "240px",
        }}
      >
        {playable && (
          <>
            <Stepps number={number} />
            <Typography variant='h5' style={{ marginTop: "10px" }}>
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
            <div style={{ margin: "35px 0 20px", minHeight: "30px" }}>
              {answers.length === number + 1 && answers.length !== TOTAL_QUESTIONS && (
                <NextButton nextQuestion={nextQuestion} />
              )}
            </div>
          </>
        )}

        {/* todo Create Compoennt */}
        {!playable && (
          <Results
            score={score}
            newGame={newGame}
            setShowingAnswers={() => setShowAnswers(true)}
          />
        )}
        {/* todo Create Compoennt */}

        {showAnswers && (
          <Grid container spacing={3}>
            {answers.map((answer, i) => (
              <Grid key={i} item xs={12} sm={6}>
                <Typography variant='h4' align='center'>
                  Question #{i + 1}
                </Typography>

                <img
                  style={{ maxWidth: "100%" }}
                  src={questions[i].image}
                  alt='Question'
                />
                <Typography
                  variant='h5'
                  className={answer.correct ? "correct" : "incorrect"}
                >
                  Your Answer: {answer.answer}
                </Typography>
                <Typography variant='h5'>
                  Correct Answer:
                  {questions[i].answers.filter(a => a.correct)[0].answer}
                </Typography>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default App;
