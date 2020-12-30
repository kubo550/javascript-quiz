import React, { useEffect, useState } from "react";
// Components
import QuestionCard from "./components/QuestionCard";
import { Container, Grid, Typography, Button } from "@material-ui/core";
// Types & Functions
import { addQuestionToDB } from "./firebase/app";
import { fetchQuestions, Difficulty, QuestionType, Answer } from "./_api/fetchQuestions";

const TOTAL_QUESTIONS = 3;
const App = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [playable, setPlayable] = useState(false);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    (async () => {
      const questions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.easy);
      await addQuestionToDB();
      setQuestions(questions);
      setLoading(false);
      setPlayable(true);
    })();
  }, []);

  const newGame = () => {
    setUserAnswers([]);
    setPlayable(true);
    setNumber(0);
    setScore(0);
    setShowAnswers(false);
  };

  const callback = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (playable) {
      const answerText = e.currentTarget.value;
      const answer = questions[number].answers.filter(a => a.answer === answerText)[0];
      setUserAnswers(prev => [...prev, answer]);
      const score = answer.correct ? 1 : 0;
      setScore(prev => prev + score);
    }
  };

  const nextQuestion = () => {
    if (playable && number < TOTAL_QUESTIONS) {
      setNumber(prev => prev + 1);
    }
  };

  return (
    <Container>
      {loading ? (
        "Loaging..."
      ) : (
        <Grid
          container
          spacing={3}
          direction='column'
          justify='center'
          alignItems='center'
        >
          <QuestionCard
            question={questions[number]}
            number={number}
            totalQuestions={TOTAL_QUESTIONS}
            callback={callback}
            nextQuestion={nextQuestion}
            isAnswered={userAnswers.length === number + 1}
          />

          {/* CREATE COMPONENT */}
          {userAnswers.length === TOTAL_QUESTIONS && (
            <Grid item>
              <Typography variant='h4'>
                Your Score is {score} / {TOTAL_QUESTIONS}
              </Typography>
              <Button
                variant='contained'
                color='primary'
                onClick={() => setShowAnswers(true)}
              >
                Show My Answers
              </Button>
              <Button variant='contained' color='secondary' onClick={newGame}>
                Restart Game
              </Button>
            </Grid>
          )}

          {/* CREATE COMPONENT */}
          {showAnswers &&
            userAnswers.map((answer, idx) => (
              <div key={answer.answer}>
                <h3 dangerouslySetInnerHTML={{ __html: questions[idx].question }}></h3>
                <p className={answer.correct ? "correct" : "incorrect"}>
                  Your answer: <b> {answer.answer} </b>
                </p>
                <p>
                  Correct answer: <b> {questions[idx].correct_answer} </b>
                </p>
              </div>
            ))}
        </Grid>
      )}
    </Container>
  );
};

export default App;
