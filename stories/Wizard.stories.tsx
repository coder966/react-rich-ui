import { Meta } from '@storybook/react';
import React from 'react';
import '../src/button/style.css';
import { RruStepsWizard, RruStepsWizardStepProps } from '../src/steps-wizard/react-rich-ui-steps-wizard';
import '../src/steps-wizard/style.css';

const storyMeta: Meta = {
  title: 'Wizard',
  component: RruStepsWizard,
};

export default storyMeta;

export const WizardExample = (args: RruStepsWizardStepProps) => {

  const FirstStep = props => (
    <div>
      <h1>This is the first step content</h1>
      <button onClick={props.nextStep}>next</button>
      <button onClick={props.lastStep}>last step</button>
    </div>
  );

  const SecondStep = props => (
    <div>
      <h1>This is the second step content</h1>
      <button onClick={props.previousStep}>back</button>
      <button onClick={event => props.nextStep({name: 'Khalid', colour: 'Blue'})}>next</button>
    </div>
  );

  const ThirdStep = props => (
    <div>
      <h1>This is the third step content</h1>
      {props.previousStepData ? 
        <>
          <p>Name: {props.previousStepData.name}</p>
          <p>colour: {props.previousStepData.colour}</p>
        </>
      : null}
      <button onClick={props.firstStep}>first step</button>
    </div>
  );

  return (
    <>
      <RruStepsWizard {...args}>
        <FirstStep stepLabel='First Step' />
        <SecondStep stepLabel='Second Step' />
        <ThirdStep stepLabel='Third Step' />
      </RruStepsWizard>
    </>
  );
};
