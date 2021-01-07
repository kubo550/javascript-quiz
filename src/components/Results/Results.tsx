import { Button, Typography } from "@material-ui/core";

interface ResultProps {
  score: number;
  newGame: () => void;
  setShowingAnswers: () => void;
}

const Results: React.FC<ResultProps> = ({ score, newGame, setShowingAnswers }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Button variant='contained' color='secondary' onClick={setShowingAnswers}>
        Show Answers
      </Button>
      <Typography variant='h5'>Your Score {score} / 15</Typography>
      <Button variant='contained' color='primary' onClick={newGame}>
        Restart Game
      </Button>
    </div>
  );
};

export default Results;
