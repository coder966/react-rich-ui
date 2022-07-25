/*
 * Copyright 2022 Khalid H. Alharisi
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

import { createContext, useContext } from "react";
import RruStepsWizardContextType from "../types/RruStepsWizardContextType";

const noContextErrorMessage = 'Could not find the StepsWizardContext. Make sure your component is a descendant of a RruStepsWizard';
const defaultContextValue: RruStepsWizardContextType = {
  currentStepNumber: 0,
  currentStepLabel: undefined,
  currentStepInputData: undefined,
  goToStep: (stepNumber: number, data?: any) => { throw noContextErrorMessage },
  nextStep: (data?: any) => { throw noContextErrorMessage },
  previousStep: (data?: any) => { throw noContextErrorMessage },
  firstStep: (data?: any) => { throw noContextErrorMessage },
  lastStep: (data?: any) => { throw noContextErrorMessage },
}

const context = createContext<RruStepsWizardContextType>(defaultContextValue);

const useRruStepsWizardContext = (): RruStepsWizardContextType => {
  return useContext(context);
}

const RruStepsWizardContextProvider = context.Provider;

export default useRruStepsWizardContext;
export { RruStepsWizardContextProvider };
