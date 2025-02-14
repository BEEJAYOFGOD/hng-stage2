import { useState } from "react";

const useMultiStepForm = (steps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((index) => {
      if (index >= steps.length - 1) return 0;
      return index + 1;
    });
  }

  function back() {
    setCurrentStepIndex((index) => {
      if (index <= 0) return steps.length - 1; // If on the first step, go to the last step
      return index - 1; // Otherwise, go back one step
    });
  }

  function goTo(index) {
    setCurrentStepIndex(index);
  }
  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
  };
};

export default useMultiStepForm;
