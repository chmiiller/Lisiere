import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { expect, test, vi } from 'vitest';

import InputText from '@/components/InputText';

test('if InputText with value is rendered successfully', () => {
  const inputValue = 'Sony';
  render(<InputText id="1" onChange={() => {}} value={inputValue} />);
  expect(screen.getByDisplayValue(inputValue)).toBeInTheDocument();
});

test('if InputText has the passed ID value', () => {
  const inputValue = 'Sony';
  const expectedId = 'abc_123';
  render(<InputText onChange={() => {}} value={inputValue} id={expectedId} />);
  const input = screen.getByDisplayValue(inputValue);
  expect(input).toHaveAttribute('id', expectedId);
});

test('if InputText has its value updated correctly', async () => {
  const initialValue = 'Canon';
  const expectedValue = 'Sony';
  const mockOnChange = vi.fn();
  render(<InputText onChange={mockOnChange} id="1" value={initialValue} />);
  const input = screen.getByDisplayValue(initialValue);
  expect(input).toBeInTheDocument();
  await userEvent.clear(input);
  await userEvent.type(input, expectedValue);
  expect(input).toHaveDisplayValue(expectedValue);
  expect(mockOnChange).toBeCalledTimes(expectedValue.length + 1);
});
