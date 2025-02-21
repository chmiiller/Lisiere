# Lisière

![demo](https://github.com/user-attachments/assets/b32dbb2e-4ea0-4d2a-9a4d-115ecadcf8e8)

In this simple app, you're able to upload your favorite photo and add the EXIF information to the image.

You'll be able to manually modify the information displayed on the image and also choose your camera's logo. I have plans of adding different styles to the image in the future, so stay tuned!

The EXIF info captured from the uploaded may include:

1. ISO
2. Focal Length
3. F Stop
4. Shutter Speed
5. Date
6. Camera Brand
7. Camera Model
8. Lens Brand (most of the time, this doesn't work)
9. Lens Model

This app is free, has no ads and it doesn't store your photos anywhere, all the EXIF process happens in your device and it's safe with you.

## How to run it

First, install all dependencies with

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project is hosted with [Vercel](https://vercel.com) and automatically deployed when there's a new commit to the `main` branch

## To Do

1. [ ] Analytics
2. [ ] General style
3. [ ] Option to hide camera logo
4. [ ] More customization options
5. [ ] E2E testing with Playwright
6. [ ] Update to Tailwind 4.0

## Tests

Unit and Integration tests are written using [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

To run the tests, use

```bash
npm run test
```

To check testing coverage use

```bash
npm run coverage
```

### Last coverage check:

| File                   | % Stmts | % Branch | % Funcs | % Lines |
| ---------------------- | ------- | -------- | ------- | ------- |
| All files              | 81.65   | 84.61    | 53.7    | 81.65   |
| Lisiere                | 0       | 66.66    | 66.66   | 0       |
| next.config.ts         | 0       | 100      | 100     | 0       |
| postcss.config.mjs     | 0       | 0        | 0       | 0       |
| tailwind.config.ts     | 0       | 100      | 100     | 0       |
| Lisiere/src            | 91.35   | 85.71    | 47.61   | 91.35   |
| store-provider.tsx     | 92.59   | 66.66    | 100     | 92.59   |
| store.tsx              | 81.39   | 100      | 15.38   | 81.39   |
| utils.tsx              | 95.65   | 86.36    | 100     | 95.65   |
| Lisiere/src/app        | 60.12   | 71.42    | 25      | 60.12   |
| layout.tsx             | 0       | 100      | 100     | 0       |
| page.tsx               | 73.13   | 66.66    | 20      | 73.13   |
| Lisiere/src/components | 96.74   | 87.5     | 92.85   | 96.74   |
| Button.tsx             | 100     | 100      | 100     | 100     |
| DatePicker.tsx         | 100     | 100      | 100     | 100     |
| FilePicker.tsx         | 91.66   | 50       | 75      | 91.66   |
| Footer.tsx             | 100     | 100      | 100     | 100     |
| ISOSelect.tsx          | 95.34   | 80       | 100     | 95.34   |
| InputText.tsx          | 100     | 100      | 100     | 100     |
| LogoSelect.tsx         | 100     | 100      | 100     | 100     |

Thanks [@mattiasw](https://github.com/mattiasw) for [ExifParser](https://github.com/mattiasw/ExifReader)
