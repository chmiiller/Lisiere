import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

export const initMixpanel = () => {
  if (!MIXPANEL_TOKEN) {
    // eslint-disable-next-line no-console
    console.warn('Mixpanel token is missing! Check your .env file.');
    return;
  }
  // @ts-expect-error new version of Mixpanel SDK didn't update types yet to support "autocapture"
  mixpanel.init(MIXPANEL_TOKEN, { autocapture: true });
};

type MixpanelConstantsType =
  | 'DownloadImageAttempt'
  | 'DownloadImageSuccess'
  | 'ChangedCameraLogo'
  | 'NoImageSelected'
  | 'SelectedImage'
  | 'ReadImageSuccess'
  | 'InvalidFileType'
  | 'ReadCameraBrand'
  | 'ReadCameraModel'
  | 'ReadSpeed'
  | 'ReadFstop'
  | 'ReadFocalLength'
  | 'ReadIso'
  | 'ReadLensBrand'
  | 'ReadLensModel'
  | 'OpenedPicker';

export const MixpanelConstants: { [key in MixpanelConstantsType]: key } = {
  DownloadImageAttempt: 'DownloadImageAttempt',
  DownloadImageSuccess: 'DownloadImageSuccess',
  ChangedCameraLogo: 'ChangedCameraLogo',
  NoImageSelected: 'NoImageSelected',
  SelectedImage: 'SelectedImage',
  ReadImageSuccess: 'ReadImageSuccess',
  InvalidFileType: 'InvalidFileType',
  ReadCameraBrand: 'ReadCameraBrand',
  ReadCameraModel: 'ReadCameraModel',
  ReadSpeed: 'ReadSpeed',
  ReadFstop: 'ReadFstop',
  ReadFocalLength: 'ReadFocalLength',
  ReadIso: 'ReadIso',
  ReadLensBrand: 'ReadLensBrand',
  ReadLensModel: 'ReadLensModel',
  OpenedPicker: 'OpenedPicker',
};
