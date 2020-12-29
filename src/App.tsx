import React, { useEffect, useState } from "react";
import { fetchQuestions, Difficulty, Question } from "./_api/fetchQuestions";

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    (async () => {
      const questions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.easy);
      setQuestions(questions);
      setLoading(false);
    })();
  }, []);

  console.log(questions);

  return <div>{loading ? "Loaging..." : "i have data"}</div>;
};

export default App;
