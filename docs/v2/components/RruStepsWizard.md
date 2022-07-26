[Docs](/) > [V2](/docs/v2/get-started) > [Wizards](/docs/v2/components/RruStepsWizard)

# RruStepsWizard

## Example

<iframe src="https://codesandbox.io/embed/laughing-forest-gkmsyj?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="laughing-forest-gkmsyj"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Props

| Name         | Description                                                            | Required |
| ------------ | ---------------------------------------------------------------------- | -------- |
| children     | Steps `node`s                                                          | Yes      |
| getStepLabel | An optional function that given a step number, returns the step label. | No       |
| renderHeader | An optional function that is used to render a custom header            | No       |

## useRruStepsWizardContext

Inside your step components (i.e. the children of RruStepsWizard), you can use `useRruStepsWizardContext` to control the wizard.

These properties are available in the context:

| Name                 | Type                                   | Description                                                                                  |
| -------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------- |
| currentStepNumber    | number                                 | The current step number.                                                                     |
| currentStepLabel     | string                                 | The current step label.                                                                      |
| currentStepInputData | any                                    | The current step data passed from the referring step.                                        |
| goToStep             | (stepNumber: int, [data: any]) => void | A function used to set the desired step. You can pass data to the step which you're setting. |
| firstStep            | ([data: any]) => void                  | A function used to go to the first step. You can pass data to the first step.                |
| lastStep             | ([data: any]) => void                  | A function used to go to the last step. You can pass data to the last step.                  |
| nextStep             | ([data: any]) => void                  | A function used to go to the next step. You can pass data to the next step.                  |
| previousStep         | ([data: any]) => void                  | A function used to go to the previous step. You can pass data to the previous step.          |
