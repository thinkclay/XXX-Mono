/** @format */

export type RenderMode = 'extension' | 'browser' | 'desktop' | 'embedded'

export interface IconProps {
  fill?: string
}

export interface PageProps {
  mode: RenderMode
  height?: number
}
export interface DataItem {
  label: string
  value: number
}
export interface DetailedChartProps {
  selectedBar: number | null
}
export interface FlagState {
  potentialFlag: number
  racial: number
  cultural: number
  household: number
  disability: number
}
