import React from 'react';
import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import Footer from '@/components/Footer';
import { LisiereStoreProvider, useLisiereStore } from '../store-provider';
import { LogoOptions } from '@/components/LogoSelect';
import { ISOOptions } from '@/components/ISOSelect';
import { LisiereState } from '@/store';
import { formatDateForFooter } from '@/utils';

vi.mock('../store-provider', () => {
  return {
    useLisiereStore: vi.fn(),
    LisiereStoreProvider: ({ children }: { children: React.ReactNode }) => (
      <div>
        {children}
      </div>
    ),
  };
});

const initialState: LisiereState = {
  exif: {
    iso: 0,
    focalLength: 0,
    fstop: 'f/0',
    speed: '1/0',
  },
  timestamp: new Date(),
  timeFormat: '',
  selectedIcon: '/logos/sony.png',
  cameraBrand: 'Sony',
  cameraModel: '',
  lensBrand: '',
  lensModel: '',
};

(useLisiereStore as ReturnType<typeof vi.fn>).mockImplementation(() => initialState);

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

test("if expected mocked values are displayed on the left side of the Footer", () => {
  const isoOption = ISOOptions[6]
  const mockState: LisiereState = {
    ...initialState,
    exif: {
      iso: isoOption,
      focalLength: 200,
      fstop: 'f/3.4',
      speed: '1/200',
    },
  };
  (useLisiereStore as ReturnType<typeof vi.fn>).mockImplementation(() => mockState);
  render(
    <LisiereStoreProvider>
      <Footer />
    </LisiereStoreProvider>
  );
  const exif = mockState.exif;
  const formattedString = `ISO ${exif.iso} ${exif.focalLength}mm ${exif.fstop} ${exif.speed}s`; // ISO 1600 200mm f/3.4 1/200s
  expect((screen.getByTestId('footer_iso') as HTMLParagraphElement).textContent).toEqual(formattedString);
});

test("if expected mocked timestamp is displayed inside the Footer", () => {
  const moonLandingDate = new Date(1969, 6, 20);
  const mockState: LisiereState = {
    ...initialState,
    timestamp: moonLandingDate,
  };
  (useLisiereStore as ReturnType<typeof vi.fn>).mockImplementation(() => mockState);
  render(
    <LisiereStoreProvider>
      <Footer />
    </LisiereStoreProvider>
  );
  const formattedTimestamp = formatDateForFooter(moonLandingDate)
  expect((screen.getByTestId('footer_timestamp') as HTMLParagraphElement).textContent).toEqual(formattedTimestamp);
});

test("if expected mocked values are displayed on the right side of the Footer", () => {
  const mockState: LisiereState = {
    ...initialState,
    cameraBrand: 'Leica',
    cameraModel: 'M11 Monochrom',
    lensBrand: 'Leica',
    lensModel: 'Vario-Elmarit-SL 24-70'
  };
  (useLisiereStore as ReturnType<typeof vi.fn>).mockImplementation(() => mockState);
  render(
    <LisiereStoreProvider>
      <Footer />
    </LisiereStoreProvider>
  );
  const formattedStringCamera = `${mockState.cameraBrand} ${mockState.cameraModel}`; // Leica M11 Monochrom
  const formattedStringLens = `${mockState.lensBrand} ${mockState.lensModel}`; // Leica Vario-Elmarit-SL 24-70
  expect((screen.getByTestId('footer_camera') as HTMLParagraphElement).textContent).toEqual(formattedStringCamera);
  expect((screen.getByTestId('footer_lens') as HTMLParagraphElement).textContent).toEqual(formattedStringLens);
});