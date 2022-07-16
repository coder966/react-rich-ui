import React, { FC, useState } from 'react';
import './style.css';
import RruStepsWizardProps from './types/RruStepsWizardProps';
import RruStepsWizardStepProps from './types/RruStepsWizardStepProps';


/**
 * A steps wizard. Render any number of child components and they will be treated as steps of this wizard.
 *
 * @author coder966
 */
const RruStepsWizard: FC<RruStepsWizardProps> = (props) => {
  const [currentStepNumber, setCurrentStepNumber] = useState(1);
  const [previousStepData, setPreviousStepData] = useState<object | undefined>();

  const steps = Array.isArray(props.children) ? props.children : props.children ? [props.children] : [];

  const goToStep = (stepNumber: number, data?: object) => {
    if (stepNumber < 1) {
      stepNumber = 1;
    } else if (stepNumber > steps.length) {
      stepNumber = steps.length;
    }

    // call order is critical
    setPreviousStepData(data);
    setCurrentStepNumber(stepNumber);
  };

  const firstStep = (data?: object) => goToStep(1, data);

  const lastStep = (data?: object) => goToStep(steps.length, data);

  const nextStep = (data?: object) => goToStep(currentStepNumber + 1, data);

  const previousStep = (data?: object) => goToStep(currentStepNumber - 1, data);

  return (
    <div className='rru-steps-wizard'>
      {props.noHeader ? null : (
        <div className='header'>
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const stepLabel = step.props.stepLabel;
            return (
              <div
                key={index}
                className={
                  'step ' +
                  (stepNumber < currentStepNumber ? 'done' : '') +
                  (stepNumber === currentStepNumber ? 'current' : '')
                }
              >
                <div className='step-number-container'>{stepNumber}</div>
                <div className='step-label-container'>{stepLabel}</div>
              </div>
            );
          })}
        </div>
      )}

      <div className='body'>
        {steps.map((step, index) => {
          if (index + 1 === currentStepNumber) {
            const stepProps: RruStepsWizardStepProps = {
              goToStep,
              firstStep,
              lastStep,
              nextStep,
              previousStep,
              previousStepData,
            };
            return React.cloneElement(step, stepProps);
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default RruStepsWizard;
