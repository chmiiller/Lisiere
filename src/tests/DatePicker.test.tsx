import React from 'react';
import { expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/vitest";

import DatePicker from '@/components/DatePicker';
import { formatDateForPicker } from '@/utils';

test("if DatePicker is rendered successfully", () => {
  const today = formatDateForPicker(new Date());
  render( <DatePicker onDateChange={() => {}}/> );
  expect(screen.getByDisplayValue(today)).toBeInTheDocument();
});

test("if DatePicker is rendered with passed value", () => {
  const twentyFourInMs = 24 * 60 * 60 * 1000;
  const tomorrow = new Date(new Date().getTime() + twentyFourInMs);
  const formattedTomorrow = formatDateForPicker(tomorrow);
  render( <DatePicker onDateChange={() => {}} value={tomorrow}/> );
  expect(screen.getByDisplayValue(formattedTomorrow)).toBeInTheDocument();
});

test("if the callback function of the DatePicker works", () => {
  const today = formatDateForPicker(new Date());
  const moonLanding = formatDateForPicker(new Date(1969, 6, 17)); // 1969-07-16
  const pickerCallback = vi.fn();
  
  render(<DatePicker onDateChange={pickerCallback}/>);

  const datePicker = screen.getByDisplayValue(today);
  expect(datePicker).toBeInTheDocument();
  
  fireEvent.change(datePicker, {target: {value: moonLanding}});
  
  expect(screen.getByDisplayValue(moonLanding)).toBeInTheDocument();
  expect(pickerCallback).toBeCalledTimes(1);
});