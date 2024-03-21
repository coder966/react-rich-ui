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

import { Meta } from '@storybook/react';
import { useState } from 'react';
import { RruStepsWizard, useRruStepsWizardContext } from '../src/index';

const storyMeta: Meta = {
  title: 'RruStepsWizard',
};

export default storyMeta;

const FirstStep = (props) => {
  const wizardContext = useRruStepsWizardContext();
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const navigateToNextStep = () => {
    const data = {
      name: name,
      color: color,
    };
    wizardContext.nextStep(data);
  };

  return (
    <div>
      <h1>This is the first step</h1>
      <h1>Step number read from the context: {wizardContext.currentStepNumber}</h1>
      <h1>Step label read from the context: {wizardContext.currentStepLabel}</h1>

      <form>
        <label>Name: </label>
        <input className='form-control w-auto d-inline m-1' type='text' value={name} onChange={onNameChange}></input>
        <div className='mt-2'></div>
        <label>Color: </label>
        <input className='form-control w-auto d-inline m-1' type='text' value={color} onChange={onColorChange}></input>
      </form>
      <div className='mt-2'></div>

      <button className='btn btn-primary m-2' onClick={navigateToNextStep}>
        next
      </button>
    </div>
  );
};

const SecondStep = (props) => {
  const wizardContext = useRruStepsWizardContext();

  const navigateToNextStep = () => {
    const data = {
      name: 'Fixed name from step #2',
      color: 'Fixed color from step #2',
    };
    wizardContext.nextStep(data);
  };

  return (
    <div>
      <h1>This is the second step</h1>

      {wizardContext.currentStepInputData && (
        <div>
          <span>Name: {wizardContext.currentStepInputData.name}</span>
          <br></br>
          <span>color: {wizardContext.currentStepInputData.color}</span>
        </div>
      )}

      <button className='btn btn-primary m-2' onClick={navigateToNextStep}>
        next
      </button>

      <br></br>

      <button className='btn btn-primary m-2' onClick={wizardContext.previousStep}>
        back
      </button>
    </div>
  );
};

const ThirdStep = (props) => {
  const wizardContext = useRruStepsWizardContext();

  return (
    <div>
      <h1>This is the third step</h1>

      {wizardContext.currentStepInputData && (
        <div>
          <span>Name: {wizardContext.currentStepInputData.name}</span>
          <br></br>
          <span>color: {wizardContext.currentStepInputData.color}</span>
        </div>
      )}

      <button className='btn btn-primary m-2' onClick={wizardContext.firstStep}>
        first step
      </button>
    </div>
  );
};

export const Basic = (args) => {
  const getStepLabel = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return 'First Step';
      case 2:
        return 'Second Step';
      case 3:
        return 'Third Step';
      default:
        return 'Step #' + stepNumber;
    }
  };

  return (
    <RruStepsWizard getStepLabel={getStepLabel}>
      <FirstStep />
      <SecondStep />
      <ThirdStep />
    </RruStepsWizard>
  );
};

export const CustomHeader = (args) => {
  const getStepLabel = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return 'First Step';
      case 2:
        return 'Second Step';
      case 3:
        return 'Third Step';
      default:
        return 'Step #' + stepNumber;
    }
  };

  return (
    <RruStepsWizard
      getStepLabel={getStepLabel}
      renderHeader={(steps) => {
        return (
          <div className='d-flex flex-row'>
            {steps.map((step) => (
              <b key={step.number} className='flex-grow-1 text-center pt-4 pb-4'>
                {step.label}
              </b>
            ))}
          </div>
        );
      }}>
      <FirstStep />
      <SecondStep />
      <ThirdStep />
    </RruStepsWizard>
  );
};
