import React from 'react';
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import LogoSelect from '@/components/LogoSelect';

test("If LogoSelect label and select elements are rendered successfully", () => {
  const defaultDisplayValue = "Sony";
  const labelValue = "Camera logo";

  render(<LogoSelect onChange={() => {}}/>);
  
  expect(screen.getByDisplayValue(defaultDisplayValue)).toBeInTheDocument();
  expect(screen.getByText(labelValue)).toBeInTheDocument();
});