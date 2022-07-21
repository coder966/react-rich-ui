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

interface RruStepsWizardStepProps {

  /** Optional name to be displayed in the wizard header */
  stepLabel?: React.ReactNode;

  /** Go to a specific step number. stepNumber starts with 1 */
  goToStep: (stepNumber: number, data?: any) => void;

  /** Go to the first step */
  firstStep: (data?: any) => void;

  /** Go to the last step */
  lastStep: (data?: any) => void;

  /** Go to the next step */
  nextStep: (data?: any) => void;

  /** Go to the previous step */
  previousStep: (data?: any) => void;

  /** The data sent by the caller step (normally previous step) */
  stepInputData: any | undefined;

}

export default RruStepsWizardStepProps;
