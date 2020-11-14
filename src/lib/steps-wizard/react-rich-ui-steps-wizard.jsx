import React from 'react';
import { useState } from 'react';
import './style.css';

const RruStepsWizard = props => {

  const [currentStepNumber, setCurrentStepNumber] = useState(1);
  const [previousStepData, setPreviousStepData] = useState(null);

  const steps = Array.isArray(props.children) ? props.children : props.children ? [props.children] : [];

  const goToStep = (stepNumber, data) => {
    if(stepNumber < 1){
      stepNumber = 1;
    }else if(stepNumber > steps.length){
      stepNumber = steps.length;
    }
    setCurrentStepNumber(stepNumber);
    setPreviousStepData(data);
  }

  const firstStep = data => goToStep(1, data);

  const lastStep = data => goToStep(steps.length, data);

  const nextStep = data => goToStep(currentStepNumber+1, data);

  const previousStep = data => goToStep(currentStepNumber-1, data);

  return (
    <div className='rru-steps-wizard'>

      {props.noHeader ? null :
        <div className='header'>
          {steps.map((step, index) => {
            const stepNumber = index+1;
            const stepLabel = step.props.stepLabel;
            return (
              <div key={index} className={'step ' + (stepNumber < currentStepNumber ? 'done' : '') + (stepNumber === currentStepNumber ? 'current' : '')}>
                <div className='step-number-container'>{stepNumber}</div>
                <div className='step-label-container'>{stepLabel}</div>
              </div>
            )
          })}
        </div>
      }

      <div className='body'>
        {steps.map((step, index) => {
          if(index+1 === currentStepNumber){
            return React.cloneElement(step, {
              key: index,
              goToStep, firstStep, lastStep, nextStep, previousStep,
              previousStepData,
            });
          }else{
            return null;
          }
        })}
      </div>

    </div>
  )

}

export default RruStepsWizard;
