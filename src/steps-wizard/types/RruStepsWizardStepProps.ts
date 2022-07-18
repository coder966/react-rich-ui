interface RruStepsWizardStepProps {

  /** Optional name to be displayed in the wizard header */
  stepLabel?: React.ReactNode;

  /** Go to a specific step number. stepNumber starts with 1 */
  goToStep: (stepNumber: number, data?: any) => void;

  /** Go to the first step */
  firstStep: (data?: any) => void;

  /** Go to the last step */
  lastStep: (data?: any) => void;

  /** Go to the next step */
  nextStep: (data?: any) => void;

  /** Go to the previous step */
  previousStep: (data?: any) => void;

  /** The data sent by the caller step (normally previous step) */
  stepInputData: any | undefined;

}

export default RruStepsWizardStepProps;
