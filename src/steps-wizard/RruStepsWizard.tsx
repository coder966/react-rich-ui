/*
 * Copyright 2020 Khalid H. Alharisi
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { FC, useState } from 'react';
import './style.css';
import RruStepsWizardProps from './types/RruStepsWizardProps';
import RruStepsWizardStep from './types/RruStepsWizardStep';
import RruStepsWizardStepProps from './types/RruStepsWizardStepProps';


/**
 * A steps wizard. Render any number of child components and they will be treated as steps of this wizard.
 */
const RruStepsWizard: FC<RruStepsWizardProps> = (props) => {
  const [currentStepNumber, setCurrentStepNumber] = useState(1);
  const [stepInputData, setStepInputData] = useState<object | undefined>();

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
    setStepInputData(data);
    setCurrentStepNumber(stepNumber);
  };

  const firstStep = (data?: object) => goToStep(1, data);

  const lastStep = (data?: object) => goToStep(getSteps().length, data);

  const nextStep = (data?: object) => goToStep(currentStepNumber + 1, data);

  const previousStep = (data?: object) => goToStep(currentStepNumber - 1, data);

  const getClassName = (stepNumber: number, baseClassName: string): string => {
    let result = baseClassName;
    if (stepNumber === currentStepNumber) {
      result += ` ${baseClassName}--current`;
    } else if (stepNumber < currentStepNumber) {
      result += ` ${baseClassName}--done`;
    }
    return result;
  }
  const header = () => {
    if (props.renderHeader) {
      return props.renderHeader(getSteps());
    } else {
      return <div className='rru-steps-wizard__header'>
        {getSteps().map((step, index) => {
          return <div key={index} className={getClassName(step.number, 'rru-steps-wizard__step')}>
            <div className={getClassName(step.number, 'rru-steps-wizard__step-number')}>{step.number}</div>
            <div className={getClassName(step.number, 'rru-steps-wizard__step-label')}>{step.label}</div>
          </div>
        })}
      </div>
    }
  }

  return (
    <div className='rru-steps-wizard'>
      {header()}
      <div className='rru-steps-wizard__body'>
        {getSteps().map((step, index) => {
          if (step.number === currentStepNumber) {
            const stepProps: RruStepsWizardStepProps = {
              goToStep,
              firstStep,
              lastStep,
              nextStep,
              previousStep,
              stepInputData,
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
