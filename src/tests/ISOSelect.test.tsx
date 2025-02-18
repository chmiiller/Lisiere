import React from 'react';
import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

import ISOSelect, { ISOOptions } from '@/components/ISOSelect';

test("if ISOSelect is rendered successfully", () => {
  const firstOption = ISOOptions[0];
  render(<ISOSelect onChange={()=>{}}/>);
  expect(screen.getByDisplayValue(firstOption)).toBeInTheDocument();
});

test("if all ISO options should are available", () => {
  render(<ISOSelect onChange={() => {}} />);
  ISOOptions.forEach(ISOItem => {
    expect(screen.getByText(ISOItem.toString())).toBeTruthy();
  });
});

test("if it is possible to select an ISO option", async() => {
  const option = ISOOptions[6].toString();
  render(<ISOSelect onChange={() => {}} />);
  await userEvent.selectOptions(screen.getByRole('combobox'), option);
  expect((screen.getByRole('option', { name: option }) as HTMLOptionElement).selected).toBeTruthy();
});

test("if onChange is called two times", async() => {
  const mockOnChange = vi.fn();
  const option1 = ISOOptions[6].toString();
  const option2 = ISOOptions[7].toString();
  
  render(<ISOSelect onChange={mockOnChange}/>);
  
  await userEvent.selectOptions(screen.getByRole('combobox'), option1);
  await userEvent.selectOptions(screen.getByRole('combobox'), option2);
  
  expect(mockOnChange).toBeCalledTimes(2);
});
