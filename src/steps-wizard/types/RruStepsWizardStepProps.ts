interface RruStepsWizardStepProps {

  /** Optional name to be displayed in the wizard header */
  stepLabel?: React.ReactNode;

  /** Go to a specific step number. stepNumber starts with 1 */
  goToStep: (stepNumber: number, data?: object) => void;

  /** Go to the first step */
  firstStep: (data?: object) => void;

  /** Go to the last step */
  lastStep: (data?: object) => void;

  /** Go to the next step */
  nextStep: (data?: object) => void;

  /** Go to the previous step */
  previousStep: (data?: object) => void;

  /** The data sent by the caller step (normally previous step) */
  previousStepData: object | undefined;

}

export default RruStepsWizardStepProps;
