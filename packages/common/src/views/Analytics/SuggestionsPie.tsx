import { useEffect, useState } from 'react'
import { groupBy } from 'lodash'

import Pie from '@visx/shape/lib/shapes/Pie'
import { scaleOrdinal } from '@visx/scale'
import { Group } from '@visx/group'
import { GradientPinkBlue } from '@visx/gradient'

import { DB, Suggestion } from '@common/helpers/db'
import { CategoryType, IssueType } from '@common/tiptap/language/language-types'
import AnimatedPie from './AnimatedPie'

type CategoryMap = {
  [key in CategoryType]?: Suggestion[]
}

type TypeMap = {
  [key in IssueType]?: Suggestion[]
}

interface Frequency<T> {
  label: T
  count: number
}

interface Props {
  animate?: boolean
  margin?: { top: number; right: number; bottom: number; left: number }
  height?: number
  width?: number
}

const SuggestionsPie = ({ animate = true, margin = { top: 20, right: 20, bottom: 20, left: 20 }, height = 300, width = 500 }: Props) => {
  const [data, setData] = useState<Suggestion[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const suggestions = await DB.suggestion.toArray()
      setData(suggestions)
    }

    fetchData()
  }, [])

  if (!data) return null

  const categoryData: CategoryMap = groupBy(data, 'category')
  const categories: Frequency<CategoryType>[] = Object.entries(categoryData).map(e => ({ label: e[0] as CategoryType, count: e[1].length }))
  const typeData: TypeMap = groupBy(data, 'type')
  const types: Frequency<IssueType>[] = Object.entries(typeData).map(e => ({ label: e[0] as IssueType, count: e[1].length }))

  const [selectedType, setSelectedType] = useState<IssueType | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null)

  if (width < 10) return null

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  const radius = Math.min(innerWidth, innerHeight) / 2
  const centerY = innerHeight / 2
  const centerX = innerWidth / 2
  const donutThickness = 50

  // color scales
  const typeColors = scaleOrdinal({
    domain: Object.keys(types),
    range: [
      'rgba(0,0,0,0.35)',
      'rgba(0,0,0,0.3)',
      'rgba(0,0,0,0.25)',
      'rgba(0,0,0,0.2)',
      'rgba(0,0,0,0.15)',
      'rgba(0,0,0,0.1)',
      'rgba(0,0,0,0.05)',
    ],
  })

  const categoryColors = scaleOrdinal({
    domain: Object.keys(categoryData),
    range: ['#ff5c38', '#fcf051'],
  })

  return (
    <svg width={width} height={height}>
      <rect rx={14} width={width} height={height} fill="url('#visx-pie-gradient')" />
      <Group top={centerY + margin.top} left={centerX + margin.left}>
        <Pie
          data={selectedType ? types.filter(({ label }) => label === selectedType) : types}
          pieValue={(d: Frequency<IssueType>) => d.count}
          outerRadius={radius}
          innerRadius={radius - donutThickness}
          cornerRadius={3}
          padAngle={0.005}
        >
          {pie => (
            <AnimatedPie<Frequency<IssueType>>
              {...pie}
              animate={animate}
              getKey={arc => arc.data.label}
              onClickDatum={({ data: { label } }) => animate && setSelectedType(selectedType && selectedType === label ? null : label)}
              getColor={arc => typeColors(arc.data.label)}
            />
          )}
        </Pie>

        <Pie
          data={selectedCategory ? categories.filter(({ label }) => label === selectedCategory) : categories}
          pieValue={(d: Frequency<CategoryType>) => d.count}
          pieSortValues={() => -1}
          outerRadius={radius - donutThickness * 1.3}
        >
          {pie => (
            <AnimatedPie<Frequency<CategoryType>>
              {...pie}
              animate={animate}
              getKey={({ data: { label } }) => label}
              onClickDatum={({ data: { label } }) =>
                animate && setSelectedCategory(selectedCategory && selectedCategory === label ? null : label)
              }
              getColor={({ data: { label } }) => categoryColors(label)}
            />
          )}
        </Pie>
      </Group>
      {animate && (
        <text textAnchor="end" x={width - 16} y={height - 16} fill="white" fontSize={11} fontWeight={300} pointerEvents="none">
          Click segments to update
        </text>
      )}
    </svg>
  )
}

export default SuggestionsPie
