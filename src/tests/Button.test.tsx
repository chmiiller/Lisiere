import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { ArrowUpFromLine } from 'lucide-react';

import Button from '../components/Button';

describe("when adding a Button with a title", () => {
  it("should display the passed title on the screen", () => {
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
});