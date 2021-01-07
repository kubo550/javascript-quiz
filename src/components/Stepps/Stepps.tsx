import { Stepper, Step, StepLabel } from "@material-ui/core";

interface StepperProps {
  number: number;
}

const steps = Array(15).fill(null);

const Stepps: React.FC<StepperProps> = ({ number }) => {
  return (
    <Stepper activeStep={number}>
      {steps.map((step, i) => (
        <Step key={i}>
          <StepLabel />
        </Step>
      ))}
    </Stepper>
  );
};

export default Stepps;
