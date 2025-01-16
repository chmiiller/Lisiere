import { createStore } from 'zustand/vanilla'

// Store types
export type Exif = {
  iso: number,
  focalLength: number,
  fstop: number,
  speed: string,
};
export type LisiereState = {
  exif: Exif;
  timestamp: Date;
  timeFormat: string;
  selectedIcon: string;
  cameraBrand: string;
  cameraModel: string;
  lensBrand: string;
  lensModel: string;
}
export type LisiereActions = {
  setIso: (iso: number) => void;
  setFocalLength: (focalLength: number) => void;
  setFstop: (fstop: number) => void;
  setSpeed: (speed: string) => void;
  setTimestamp: (timestamp: Date) => void;
  setTimeFormat: (timeFormat: string) => void;
  setSelectedIcon: (selectedIcon: string) => void;
  setCameraBrand: (cameraBrand: string) => void;
  setCameraModel: (cameraModel: string) => void;
  setLensBrand: (lensBrand: string) => void;
  setLensModel: (lensModel: string) => void;
}
export type LisiereStore = LisiereState & LisiereActions

export const defaultInitState: LisiereState = {
  exif: {
    iso: 1600,
    focalLength: 26,
    fstop: 1.5,
    speed: '1/14s',
  },
  timestamp: new Date(),
  timeFormat: '',
  selectedIcon: '/logos/sony.svg',
  cameraBrand: '',
  cameraModel: '',
  lensBrand: '',
  lensModel: '',
}

export const initLisiereStore = (): LisiereState => defaultInitState;

export const createLisiereStore = (
  initState: LisiereState = defaultInitState,
) => {
  return createStore<LisiereStore>()((set) => ({
    ...initState,
    setIso: (iso) => set((state) => ({ exif: 
      { ...state.exif, iso }
    })),
    setFocalLength: (focalLength) => set((state) => ({ exif: 
      { ...state.exif, focalLength }
    })),
    setFstop: (fstop) => set((state) => ({ exif: 
      { ...state.exif, fstop }
    })),
    setSpeed: (speed) => set((state) => ({ exif: 
      { ...state.exif, speed }
    })),
    setTimestamp: (timestamp) => set(() => ({ timestamp })),
    setTimeFormat: (timeFormat) => set(() => ({ timeFormat })),
    setSelectedIcon: (selectedIcon) => set(() => ({ selectedIcon })),
    setCameraBrand: (cameraBrand) => set(() => ({ cameraBrand })),
    setCameraModel: (cameraModel) => set(() => ({ cameraModel })),
    setLensBrand: (lensBrand) => set(() => ({ lensBrand })),
    setLensModel: (lensModel) => set(() => ({ lensModel })),
  }))
}