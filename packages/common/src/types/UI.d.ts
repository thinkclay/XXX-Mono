/** @format */

export type RenderMode = 'extension' | 'browser' | 'desktop'

export interface IconProps {
  fill?: string
}

export interface PageProps {
  mode: RenderMode
}
