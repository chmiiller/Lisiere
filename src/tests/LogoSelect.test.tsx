import React from 'react';
import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

import LogoSelect, { LogoOptions } from '@/components/LogoSelect';

test("If LogoSelect label and select elements are rendered successfully", () => {
  const defaultDisplayValue = "Sony";
  const labelValue = "Camera logo";

  render(<LogoSelect onChange={() => {}}/>);

  expect(screen.getByDisplayValue(defaultDisplayValue)).toBeInTheDocument();
  expect(screen.getByText(labelValue)).toBeInTheDocument();
});

test("if options under LogoSelect are the same from LogoOptions", () => {
  render(<LogoSelect onChange={() => {}} />);
  LogoOptions.forEach(logo => {
    expect(screen.getByText(logo.name)).toBeTruthy();
  });
});

test("if it is possible to select a Logo option", async() => {
  const option = LogoOptions[3]; // Leica
  render(<LogoSelect onChange={() => {}} />);
  await userEvent.selectOptions(screen.getByRole('combobox'), option.name);
  expect((screen.getByRole('option', { name: option.name }) as HTMLOptionElement).selected).toBeTruthy();
});

test("if onChange is called 3 times", async() => {
  const mockOnChange = vi.fn();
  const option1 = LogoOptions[0]; // Sony
  const option2 = LogoOptions[2]; // Canon
  const option3 = LogoOptions[3]; // Leica

  render(<LogoSelect onChange={mockOnChange} />);
  await userEvent.selectOptions(screen.getByRole("combobox"), option1.name);
  await userEvent.selectOptions(screen.getByRole("combobox"), option2.name);
  await userEvent.selectOptions(screen.getByRole('combobox'), option3.name);
  
  expect(mockOnChange).toBeCalledTimes(3);
});