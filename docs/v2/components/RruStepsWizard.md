[Docs](/) > [V2](/docs/v2/get-started) > [Wizards](/docs/v2/components/RruStepsWizard)

# RruStepsWizard

## Props

| Name         | Description                                                            | Required |
| ------------ | ---------------------------------------------------------------------- | -------- |
| children     | Steps `node`s                                                          | Yes      |
| getLabel     | An optional function that given a step number, returns the step label. | No       |
| renderHeader | An optional function that is used to render a custom header            | No       |

## useRruStepsWizardContext

Inside your step components (i.e. the children of RruStepsWizard), you can use `useRruStepsWizardContext` to control the wizard.

These properties are available in the context:

| Name          | Type                                   | Description                                                                                  |
| ------------- | -------------------------------------- | -------------------------------------------------------------------------------------------- |
| stepInputData | any                                    | The data passed from the referring step.                                                     |
| goToStep      | (stepNumber: int, [data: any]) => void | A function used to set the desired step. You can pass data to the step which you're setting. |
| firstStep     | ([data: any]) => void                  | A function used to go to the first step. You can pass data to the first step.                |
| lastStep      | ([data: any]) => void                  | A function used to go to the last step. You can pass data to the last step.                  |
| nextStep      | ([data: any]) => void                  | A function used to go to the next step. You can pass data to the next step.                  |
| previousStep  | ([data: any]) => void                  | A function used to go to the previous step. You can pass data to the previous step.          |
