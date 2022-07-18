import { Meta } from '@storybook/react';
import React, { useState } from 'react';
import { RruStepsWizard } from '../src/index';

const storyMeta: Meta = {
  title: 'RruStepsWizard',
};

export default storyMeta;

const FirstStep = (props) => {
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
    props.nextStep(data);
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
    <button onClick={props.lastStep}>last step</button>
  </div>
};

const SecondStep = (props) => (
  <div>
    <h1>This is the second step</h1>

    {props.stepInputData && <div>
      <span>Name: {props.stepInputData.name}</span>
      <br></br>
      <span>color: {props.stepInputData.color}</span>
    </div>}

    <button onClick={props.previousStep}>back</button>
    <button onClick={e => props.nextStep({ name: 'Khalid', color: 'Blue' })}>next</button>
  </div>
);

const ThirdStep = (props) => (
  <div>
    <h1>This is the third step</h1>

    {props.stepInputData && <div>
      <span>Name: {props.stepInputData.name}</span>
      <br></br>
      <span>color: {props.stepInputData.color}</span>
    </div>}

    <button onClick={props.firstStep}>first step</button>
  </div>
);

export const Basic = (args) => {
  return (
    <RruStepsWizard>
      <FirstStep stepLabel='First Step' />
      <SecondStep stepLabel='Second Step' />
      <ThirdStep stepLabel='Third Step' />
    </RruStepsWizard>
  );
};

export const CustomHeader = (args) => {
  return (
    <RruStepsWizard
      renderHeader={(steps => {
        return <div className='d-flex flex-row'>
          {steps.map(step => <b className='flex-grow-1 text-center pt-4 pb-4'>{step.label}</b>)}
        </div>
      })}
    >
      <FirstStep stepLabel='First Step' />
      <SecondStep stepLabel='Second Step' />
      <ThirdStep stepLabel='Third Step' />
    </RruStepsWizard>
  );
};
