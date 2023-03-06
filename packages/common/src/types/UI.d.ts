/** @format */

export type RenderMode = 'extension' | 'browser' | 'desktop' | 'embedded'

export interface IconProps {
  fill?: string
}

export interface PageProps {
  mode: RenderMode
  height?: number
}
