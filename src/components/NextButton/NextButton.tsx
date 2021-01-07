import { Box, Button } from "@material-ui/core";

interface ButtonProps {
  nextQuestion: () => void;
}

const NextButton: React.FC<ButtonProps> = ({ nextQuestion }) => {
  return (
    <Box style={{ textAlign: "right" }}>
      <Button variant='contained' color='secondary' onClick={nextQuestion}>
        next question
      </Button>
    </Box>
  );
};

export default NextButton;
