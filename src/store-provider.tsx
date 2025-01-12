'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
  type LisiereStore,
  createLisiereStore,
  initLisiereStore,
} from '@/store'

export type LisiereStoreApi = ReturnType<typeof createLisiereStore>

export const LisiereStoreContext = createContext<LisiereStoreApi | undefined>(
  undefined,
)

export interface LisiereStoreProviderProps {
  children: ReactNode
}

export const LisiereStoreProvider = ({
  children,
}: LisiereStoreProviderProps) => {
  const storeRef = useRef<LisiereStoreApi>(null)
  if (!storeRef.current) {
    storeRef.current = createLisiereStore(initLisiereStore())
  }

  return (
    <LisiereStoreContext.Provider value={storeRef.current}>
      {children}
    </LisiereStoreContext.Provider>
  )
}

export const useLisiereStore = <T,>(
  selector: (store: LisiereStore) => T,
): T => {
  const storeContext = useContext(LisiereStoreContext)

  if (!storeContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`)
  }

  return useStore(storeContext, selector)
}