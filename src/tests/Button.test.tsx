import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { test, expect, vi } from "vitest";
import { ArrowUpFromLine } from 'lucide-react';
import "@testing-library/jest-dom/vitest";

import Button from '@/components/Button';

test("if button is displayed with the passed title", () => {
  const buttonTitle = "Button Title 123";
  render(
    <Button
      onClick={() => {}}
      title={buttonTitle}>
        <ArrowUpFromLine size={18}/>
    </Button>
  );
  
  expect(screen.getByText(buttonTitle)).toBeInTheDocument();
});

test("if button is displayed with icon", () => {
  const { container } = render(
    <Button onClick={() => {}}>
        <ArrowUpFromLine size={18}/>
    </Button>
  );
  const svg = container.querySelector("[class='lucide lucide-arrow-up-from-line']") as HTMLImageElement;
  expect(svg).toHaveClass('lucide lucide-arrow-up-from-line')
  expect(svg).toBeDefined();
});

test("if button click is working", async() => {
  const buttonTitle = "simple";
  const buttonCallback = vi.fn();
  render(
    <Button onClick={buttonCallback} title={buttonTitle}>
        <ArrowUpFromLine size={18}/>
    </Button>
  );
  const button = screen.getByTestId(`button_${buttonTitle}`);
  expect(button).toBeDefined();

  await userEvent.click(button);
  expect(buttonCallback).toBeCalled();
});
