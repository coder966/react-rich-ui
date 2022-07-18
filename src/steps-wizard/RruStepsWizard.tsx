import React, { FC, useState } from 'react';
import './style.css';
import RruStepsWizardProps from './types/RruStepsWizardProps';
import RruStepsWizardStep from './types/RruStepsWizardStep';
import RruStepsWizardStepProps from './types/RruStepsWizardStepProps';


/**
 * A steps wizard. Render any number of child components and they will be treated as steps of this wizard.
 *
 * @author coder966
 */
const RruStepsWizard: FC<RruStepsWizardProps> = (props) => {
  const [currentStepNumber, setCurrentStepNumber] = useState(1);
  const [previousStepData, setPreviousStepData] = useState<object | undefined>();

  const stepsComponents = Array.isArray(props.children) ? props.children : props.children ? [props.children] : [];

  const getSteps = (): readonly RruStepsWizardStep[] => {
    return stepsComponents.map((component, index) => ({
      number: index + 1,
      label: component.props.stepLabel,
      component: component,
    }));
  }

  const goToStep = (stepNumber: number, data?: object) => {
    if (stepNumber < 1) {
      stepNumber = 1;
    } else if (stepNumber > getSteps().length) {
      stepNumber = getSteps().length;
    }

    // call order is critical
    setPreviousStepData(data);
    setCurrentStepNumber(stepNumber);
  };

  const firstStep = (data?: object) => goToStep(1, data);

  const lastStep = (data?: object) => goToStep(getSteps().length, data);

  const nextStep = (data?: object) => goToStep(currentStepNumber + 1, data);

  const previousStep = (data?: object) => goToStep(currentStepNumber - 1, data);

  const header = () => {
    if (props.renderHeader) {
      return props.renderHeader(getSteps());
    } else {
      return <div className='header'>
        {getSteps().map((step, index) => {
          let className = 'step';
          if (step.number < currentStepNumber) {
            className += ' done';
          }
          if (step.number === currentStepNumber) {
            className += ' current';
          }
          return <div key={index} className={className}>
            <div className='step-number-container'>{step.number}</div>
            <div className='step-label-container'>{step.label}</div>
          </div>
        })}
      </div>
    }
  }

  return (
    <div className='rru-steps-wizard'>
      {header()}
      <div className='body'>
        {getSteps().map((step, index) => {
          if (step.number === currentStepNumber) {
            const stepProps: RruStepsWizardStepProps = {
              goToStep,
              firstStep,
              lastStep,
              nextStep,
              previousStep,
              previousStepData,
            };
            return React.cloneElement(stepsComponents[index], stepProps);
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default RruStepsWizard;
