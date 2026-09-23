import { createContext, useContext } from 'react'

export type GetScrollView = () => HTMLElement | null

export const ScrollViewContext = createContext<GetScrollView>(() => null)

export const useScrollView = () => useContext(ScrollViewContext)
