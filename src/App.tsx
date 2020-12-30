import React, { useEffect, useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuestions, Difficulty, QuestionType, Answer } from "./_api/fetchQuestions";

const TOTAL_QUESTIONS = 15;

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
    <div>
      {loading ? (
        "Loaging..."
      ) : (
        <>
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
            <>
              <h2>
                NICE! Your Score is {score} / {TOTAL_QUESTIONS}
              </h2>
              <button onClick={() => setShowAnswers(true)}>Show My Answers</button>
              <button onClick={newGame}>Restart Game</button>
            </>
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
        </>
      )}
    </div>
  );
};

export default App;
