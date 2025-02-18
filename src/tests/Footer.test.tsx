import React from 'react';
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import Footer from '@/components/Footer';
import { LisiereStoreProvider } from '@/store-provider';
import { LogoOptions } from '@/components/LogoSelect';

test("if the default Footer is rendered", () => {
  render(
    <LisiereStoreProvider>
      <Footer />
    </LisiereStoreProvider>
  );
  expect(screen.getByTestId('footer')).toBeInTheDocument();
  expect((screen.getByRole('img') as HTMLImageElement).alt).toEqual("camera logo");
});

test("if the initial logo is pointing to the Sony logo", () => {
  const domain = 'http://localhost:3000';
  const sonyLogoPath = LogoOptions[0].url;
  render(
    <LisiereStoreProvider>
      <Footer />
    </LisiereStoreProvider>
  );
  expect((screen.getByRole('img') as HTMLImageElement).src).toEqual(domain + sonyLogoPath);
});