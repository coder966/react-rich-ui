import RruStepsWizardStep from "./RruStepsWizardStep";
import RruStepsWizardStepProps from "./RruStepsWizardStepProps";

interface RruStepsWizardProps {
  /** Should hide the default header (with steps name and current step indicator) */
  renderHeader?: (stepsData: readonly RruStepsWizardStep[]) => React.ReactNode;

  /** The steps: can be any component. These step components will receive props of type: `RruStepsWizardStepProps` */
  children: React.ReactElement<RruStepsWizardStepProps>[];
}

export default RruStepsWizardProps;
