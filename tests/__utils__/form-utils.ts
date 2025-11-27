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

import { fireEvent, getByText, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

export const submitForm = async (container: Element) => {
  const submitButton = container.querySelector('button[type="submit"]');
  expect(submitButton).toBeTruthy();
  await userEvent.click(submitButton!);
}

/**
 * @param value pass null to clear the input
 */
export const writeText = async (container: HTMLElement, fieldName: string, value?: string) => {
  const fieldContainer = container.querySelector(`[data-field-name="${fieldName}"]`) as HTMLElement;
  expect(fieldContainer).toBeTruthy();

  const inputElement = fieldContainer.querySelector(`input[name="${fieldName}"], textarea[name="${fieldName}"]`);
  expect(inputElement).toBeTruthy();

  await userEvent.tripleClick(inputElement!); // trip click to select all text

  if(value === null || value === undefined){
    await userEvent.keyboard('{Backspace}');
  }else{
    await userEvent.keyboard(value);
  }
}

export const expectTypedTextIsRendered = (container: Element, fieldName: string, value: string) => {
  const fieldContainer = container.querySelector(`[data-field-name="${fieldName}"]`) as HTMLElement;
  expect(fieldContainer).toBeTruthy();

  // this is just a data attribute
  const dataFieldValue = fieldContainer!.getAttribute('data-field-value');
  expect(dataFieldValue).toBe(value);

  // this is what actually the user sees
  const inputElement = fieldContainer.querySelector(`input[name="${fieldName}"], textarea[name="${fieldName}"]`) as HTMLInputElement | HTMLTextAreaElement;
  expect(inputElement).toBeTruthy();

  expect(inputElement?.value).toBe(value);
}

export const selectOption = async (container: HTMLElement, fieldName: string, optionLabel: string) => {
  const fieldContainer = container.querySelector(`[data-field-name="${fieldName}"]`);
  expect(fieldContainer).toBeTruthy();

  // open the menu
  const inputElement = fieldContainer!.querySelector(`input[aria-autocomplete="list"]`);
  expect(inputElement).toBeTruthy();
  fireEvent.keyDown(inputElement!, { key: 'ArrowDown' });

  // options container
  const optionsContainer = fieldContainer!.querySelector(`div[role="listbox"]`);
  expect(optionsContainer).toBeTruthy();

  // select
  let optionElement: HTMLElement;
  await waitFor(() => {
    optionElement = getByText(optionsContainer! as HTMLElement, optionLabel);
    expect(optionElement).toBeTruthy();
    expect(optionElement.getAttribute("role")).toBe("option");
  });

  await userEvent.click(optionElement!);
}

export const expectSelectedOptionIsRendered = (container: HTMLElement, fieldName: string, optionValue: string | string[]) => {
  const isMultiple = Array.isArray(optionValue);

  const fieldContainer = container.querySelector(`[data-field-name="${fieldName}"]`);
  expect(fieldContainer).toBeTruthy();

  // this is just a data attribute
  expect(fieldContainer!.getAttribute(`data-field-value`)).toBe(isMultiple ? optionValue.join(',') : optionValue);

  // this is what actually the user sees
  const fieldInputs = fieldContainer!.querySelectorAll(`input[name="${fieldName}"]`);
  expect(fieldInputs).toBeTruthy();

  if(isMultiple){
    expect(fieldInputs.length).toBe(optionValue.length);
    fieldInputs.forEach(fieldInput => {
      expect(optionValue).toContain(fieldInput.getAttribute("value"));
    });
  }else{
    expect(fieldInputs.length).toBe(1);
    expect(fieldInputs.item(0).getAttribute("value")).toBe(optionValue);
  }
}

export const selectRadioOption = async (container: HTMLElement, fieldName: string, optionLabel: string) => {
  const fieldContainer = container.querySelector(`[data-field-name="${fieldName}"]`);
  expect(fieldContainer).toBeTruthy();

  const labels = container.querySelectorAll(`div[role="radio"] > label`) as NodeListOf<HTMLLabelElement>;
  let targetLabel: HTMLLabelElement | null = null;
  labels.forEach(it => {
    if(it.textContent === optionLabel){
      targetLabel = it;
    }
  })

  expect(targetLabel).toBeTruthy();
  await userEvent.click(targetLabel!);
}

export const expectSelectedRadioOptionIsRendered = (container: HTMLElement, fieldName: string, optionValue: string) => {
  const isMultiple = Array.isArray(optionValue);

  const fieldContainer = container.querySelector(`[data-field-name="${fieldName}"]`);
  expect(fieldContainer).toBeTruthy();

  // this is just a data attribute
  expect(fieldContainer!.getAttribute(`data-field-value`)).toBe(isMultiple ? optionValue.join(',') : optionValue);

  // this is what actually the user sees
  const fieldInput = fieldContainer!.querySelector(`input[name="${fieldName}"][type="radio"][value="${optionValue}"]`);
  expect(fieldInput).toBeTruthy();
  expect(fieldInput?.parentElement?.parentElement?.getAttribute("aria-checked")).toBe("true");
}

export const selectMultipleCheckboxOption = async (container: HTMLElement, fieldName: string, optionLabel: string) => {
  const fieldContainer = container.querySelector(`[data-field-name="${fieldName}"]`);
  expect(fieldContainer).toBeTruthy();

  const labels = container.querySelectorAll(`div[role="checkbox"] > label`) as NodeListOf<HTMLLabelElement>;
  let targetLabel: HTMLLabelElement | null = null;
  labels.forEach(it => {
    if(it.textContent === optionLabel){
      targetLabel = it;
    }
  })

  expect(targetLabel).toBeTruthy();
  await userEvent.click(targetLabel!);
}

export const expectSelectedMultipleCheckboxOptionsAreRendered = (container: HTMLElement, fieldName: string, optionValue: string[]) => {
  const fieldContainer = container.querySelector(`[data-field-name="${fieldName}"]`);
  expect(fieldContainer).toBeTruthy();

  // this is just a data attribute
  expect(fieldContainer!.getAttribute(`data-field-value`)).toBe(optionValue.join(','));

  // this is what actually the user sees
  const fieldInputs = fieldContainer!.querySelectorAll(`input[name="${fieldName}"][type="checkbox"]`);
  expect(fieldInputs).toBeTruthy();

  const checkedValues: string[] = [];
  fieldInputs.forEach(fieldInput => {
    const parent = fieldInput.parentElement?.parentElement;
    if(parent?.getAttribute("aria-checked") === "true"){
      checkedValues.push(fieldInput.getAttribute("value") as string);
    }
  })

  expect(checkedValues.length).toBe(optionValue.length);
  checkedValues.forEach(checkedValue => {
    expect(optionValue).toContain(checkedValue);
  })
}

export const setCheckbox = async (container: HTMLElement, fieldName: string, value: boolean) => {
  const fieldContainer = container.querySelector(`[data-field-name="${fieldName}"]`);
  expect(fieldContainer).toBeTruthy();

  const label = container.querySelector(`div[role="checkbox"] > label`);
  expect(label).toBeTruthy();
  await userEvent.click(label!);
}

export const expectCheckboxStateIsRendered = (container: HTMLElement, fieldName: string, value: boolean) => {
  const fieldContainer = container.querySelector(`[data-field-name="${fieldName}"]`);
  expect(fieldContainer).toBeTruthy();

  // this is just a data attribute
  expect(fieldContainer!.getAttribute(`data-field-value`)).toBe(value + '');

  // this is what actually the user sees
  const fieldInput = fieldContainer!.querySelector(`input[name="${fieldName}"][type="checkbox"]`);
  expect(fieldInput).toBeTruthy();

  const parent = fieldInput!.parentElement?.parentElement;
  expect(parent?.getAttribute("aria-checked")).toBe(value + '');
}

export const selectFile = async (container: HTMLElement, fieldName: string, fileName: string) => {
  const fieldContainer = container.querySelector(`[data-field-name="${fieldName}"]`);
  expect(fieldContainer).toBeTruthy();

  const fileInput = fieldContainer!.querySelector('input') as HTMLElement;

  const file = new File(['some dummy content'], fileName, { type: 'image/png' });

  await userEvent.upload(fileInput, file);
};

export const expectSelectedFileIsRendered = (container: HTMLElement, fieldName: string, fileName: string) => {
  const fieldContainer = container.querySelector(`[data-field-name="${fieldName}"]`);
  expect(fieldContainer).toBeTruthy();

  // this is just a data attribute
  const dataFieldValue = fieldContainer!.getAttribute('data-field-value');
  expect(dataFieldValue === '[object File]' || dataFieldValue === '[object Object]').toBeTruthy();

  // this is what actually the user sees
  expect((fieldContainer!.querySelector('.rru-file-input__file-name-label') as HTMLLabelElement).textContent).toBe(fileName);
}

export const selectDate = async (container: Element, fieldName: string, date: string, time?: string) => {
  const fieldContainer = container.querySelector(`[data-field-name="${fieldName}"]`) as HTMLElement;
  expect(fieldContainer).toBeTruthy();

  const dateParts = date.split('-');
  const timeParts = time?.split(':');

  const inputElement = fieldContainer.querySelector(`input[name="${fieldName}"]`);
  expect(inputElement).toBeTruthy();
  await userEvent.click(inputElement!);

  if (timeParts) {
    const hourInput = fieldContainer.querySelector('.rru-date-input__footer > input:nth-of-type(1)');
    expect(hourInput).toBeTruthy();
    await userEvent.click(hourInput!);
    await userEvent.keyboard(parseInt(timeParts[0]) + '');

    const minuteInput = fieldContainer.querySelector('.rru-date-input__footer > input:nth-of-type(2)');
    expect(minuteInput).toBeTruthy();
    await userEvent.click(minuteInput!);
    await userEvent.keyboard(parseInt(timeParts[1]) + '');

    const secondInput = fieldContainer.querySelector('.rru-date-input__footer > input:nth-of-type(3)');
    expect(secondInput).toBeTruthy();
    await userEvent.click(secondInput!);
    await userEvent.keyboard(parseInt(timeParts[2]) + '');
  }

  const yearInput = fieldContainer.querySelector('.rru-date-input__header > input:nth-of-type(1)');
  expect(yearInput).toBeTruthy();
  await userEvent.click(yearInput!);
  await userEvent.keyboard(dateParts[0]);

  const monthInput = fieldContainer.querySelector('.rru-date-input__header > input:nth-of-type(2)');
  expect(monthInput).toBeTruthy();
  await userEvent.click(monthInput!);
  await userEvent.keyboard(parseInt(dateParts[1]) + '');

  const dayInput = fieldContainer.querySelector(`[data-date="${date}"]`);
  expect(dayInput).toBeTruthy();
  await userEvent.click(dayInput!);
}

export const expectSelectedDateIsRendered = (container: Element, fieldName: string, date: string | null, time?: string) => {
  const fieldContainer = container.querySelector(`[data-field-name="${fieldName}"]`) as HTMLElement;
  expect(fieldContainer).toBeTruthy();

  const finalValue = date ? (time ? date + ' ' + time : date) : null;

  // this is just a data attribute
  const dataFieldValue = fieldContainer!.getAttribute('data-field-value');
  expect(dataFieldValue).toBe(finalValue);

  // this is what actually the user sees
  const inputElement = fieldContainer.querySelector(`input[name="${fieldName}"]`);
  expect(inputElement).toBeTruthy();
  expect(inputElement?.getAttribute("value")).toBe(finalValue == null ? '' : finalValue);
}
