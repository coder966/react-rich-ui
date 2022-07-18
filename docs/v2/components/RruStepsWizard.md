[Docs](/) > [V2](/docs/v2/get-started) > [Wizards](/docs/v2/components/RruStepsWizard)

# RruStepsWizard

## API

| Prop         | Description                                                 | Required |
| ------------ | ----------------------------------------------------------- | -------- |
| children     | Steps `node`s                                               | Yes      |
| renderHeader | An optional function that is used to render a custom header | No       |

You can provide these props to the steps nodes:

| Prop      | Description                                               | Required |
| --------- | --------------------------------------------------------- | -------- |
| stepLabel | Step label that will be shown in the header of the wizard | No       |

These props will be injected into the steps nodes:

| Prop             | Type                                      | Description                                                                                  |
| ---------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------- |
| goToStep         | (stepNumber: int, [data: object]) => void | A function used to set the desired step. You can pass data to the step which you're setting. |
| firstStep        | ([data: object]) => void                  | A function used to go to the first step. You can pass data to the first step.                |
| lastStep         | ([data: object]) => void                  | A function used to go to the last step. You can pass data to the last step.                  |
| nextStep         | ([data: object]) => void                  | A function used to go to the next step. You can pass data to the next step.                  |
| previousStep     | ([data: object]) => void                  | A function used to go to the previous step. You can pass data to the previous step.          |
| previousStepData | object                                    | The data objected passed from the referring step.                                            |
