import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import React from 'react';
import { expect, test } from 'vitest';

import Page from '@/app/page';
import { ISOOptions } from '@/components/ISOSelect';
import { LogoOptions } from '@/components/LogoSelect';
import { LisiereStoreProvider } from '@/store-provider';
import { formatDateForPicker } from '@/utils';

test('If Page renders all the necessary components', () => {
  render(
    <LisiereStoreProvider>
      <Page />
    </LisiereStoreProvider>,
  );

  const buttonTitle = 'Upload an image';
  const uploadButton = screen.getByRole('button');
  expect((uploadButton as HTMLButtonElement).title).toEqual(buttonTitle);

  const input = screen.getByTestId('image_upload');
  const inputAcceptedFormats = '.jpg, .jpeg, .png';
  expect((input as HTMLInputElement).accept).toEqual(inputAcceptedFormats);

  const downloadButton = screen.getByText('Download');
  expect(downloadButton).toBeInTheDocument();

  ISOOptions.forEach((ISOItem) => {
    expect(screen.getByText(ISOItem.toString())).toBeTruthy();
  });

  LogoOptions.forEach((logo) => {
    expect(screen.getByText(logo.name)).toBeTruthy();
  });

  const today = formatDateForPicker(new Date());
  expect(screen.getByDisplayValue(today)).toBeInTheDocument();

  const doneButtonTitle = 'Done';
  const doneButton = screen.getByText(doneButtonTitle);
  expect(doneButton).toBeInTheDocument();
});
