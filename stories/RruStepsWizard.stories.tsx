import { Meta } from '@storybook/react';
import React from 'react';
import { RruStepsWizard } from '../src/index';

const storyMeta: Meta = {
  title: 'RruStepsWizard',
};

export default storyMeta;

const FirstStep = props => (
  <div>
    <h1>This is the first step</h1>
    <button onClick={props.nextStep}>next</button>
    <button onClick={props.lastStep}>last step</button>
  </div>
);

const SecondStep = props => (
  <div>
    <h1>This is the second step</h1>
    <button onClick={props.previousStep}>back</button>
    <button onClick={e => props.nextStep({ name: 'Khalid', colour: 'Blue' })}>next</button>
  </div>
);

const ThirdStep = props => (
  <div>
    <h1>This is the third step</h1>
    {props.previousStepData && <div>
      <span>Name: {props.previousStepData.name}</span>
      <br></br>
      <span>Colour: {props.previousStepData.colour}</span>
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
