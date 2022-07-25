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
import React, { useState } from 'react';
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
    setName(e.target.value)
  }

  const onColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
  }

  const navigateToNextStep = () => {
    const data = {
      name: name,
      color: color,
    }
    wizardContext.nextStep(data);
  }

  return <div>
    <h1>This is the first step</h1>

    <form>
      <label>Name: </label>
      <input type='text' value={name} onChange={onNameChange}></input>
      <br></br>
      <label>Color: </label>
      <input type='text' value={color} onChange={onColorChange}></input>
    </form>
    <br></br>

    <button onClick={navigateToNextStep}>next</button>
    <button onClick={wizardContext.lastStep}>last step</button>
  </div>
};

const SecondStep = (props) => {
  const wizardContext = useRruStepsWizardContext();

  return <div>
    <h1>This is the second step</h1>

    {wizardContext.stepInputData && <div>
      <span>Name: {wizardContext.stepInputData.name}</span>
      <br></br>
      <span>color: {wizardContext.stepInputData.color}</span>
    </div>}

    <button onClick={wizardContext.previousStep}>back</button>
    <button onClick={e => wizardContext.nextStep({ name: 'Khalid', color: 'Blue' })}>next</button>
  </div>
};

const ThirdStep = (props) => {
  const wizardContext = useRruStepsWizardContext();

  return <div>
    <h1>This is the third step</h1>

    {wizardContext.stepInputData && <div>
      <span>Name: {wizardContext.stepInputData.name}</span>
      <br></br>
      <span>color: {wizardContext.stepInputData.color}</span>
    </div>}

    <button onClick={wizardContext.firstStep}>first step</button>
  </div>
};

export const Basic = (args) => {

  const getLabel = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return 'First Step';
      case 2: return 'Second Step';
      case 3: return 'Third Step';
      default: return 'Step #' + stepNumber;
    }
  }

  return (
    <RruStepsWizard getLabel={getLabel}>
      <FirstStep />
      <SecondStep />
      <ThirdStep />
    </RruStepsWizard>
  );
};

export const CustomHeader = (args) => {

  const getLabel = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return 'First Step';
      case 2: return 'Second Step';
      case 3: return 'Third Step';
      default: return 'Step #' + stepNumber;
    }
  }

  return (
    <RruStepsWizard
      getLabel={getLabel}
      renderHeader={(steps => {
        return <div className='d-flex flex-row'>
          {steps.map(step => <b key={step.number} className='flex-grow-1 text-center pt-4 pb-4'>{step.label}</b>)}
        </div>
      })}
    >
      <FirstStep />
      <SecondStep />
      <ThirdStep />
    </RruStepsWizard>
  );
};
