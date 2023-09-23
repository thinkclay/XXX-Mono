import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'
import { doc, collection, getDocs } from 'firebase/firestore'
import { DatePicker, Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import moment from 'moment'
import { db } from '@common/services/firebase'
import { DB } from '@common/helpers/db'
import { useFirebase } from '@common/services/firebase/hook'
import { DataItem, DetailedChartProps, FlagState } from '@common/types/UI'
import { FlagsColor, getFiltterOutData, subFlagsColor, subLabels } from '@common/helpers/common'
import OverlayLoader from '../../../src/views/components/overlayLoader'

const SuggestionsPie: React.FC = () => {
  const { RangePicker } = DatePicker
  const { authUser } = useFirebase()
  const [flags, setFlags] = useState(0)
  const [acceptedFlag, setAcceptedFlag] = useState(0)
  const [ignoreList, setIgnoreList] = useState(0)
  const [rewriteFlag, setRewriteFlag] = useState(0)
  const [selectedBar, setSelectedBar] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const [suggestion, setSuggestion] = useState(Array)
  const initialState: FlagState = {
    potentialFlag: 0,
    racial: 0,
    cultural: 0,
    household: 0,
    disability: 0,
  }
  const [weeklyDisable, setWeeklyDisable] = useState(false)
  const [rangeDisable, setRangeDisable] = useState(false)
  const [checkboxDisabled, setCheckboxDisabled] = useState(false)

  const [state, setState] = useState<FlagState>(initialState)

  const countByCategoryAndType = (category: string, type: string, suggestions: any[]) => {
    return suggestions.filter(flag => flag.category === category && flag.type === type).length
  }
  const getAllSuggestions = async () => {
    const suggestions: any[] = await DB.suggestion.toArray()
    setSuggestion(suggestions)
  }

  const setAllSuggetion = async () => {
    try {
      setState(prevState => ({
        ...prevState,
        potentialFlag: countByCategoryAndType('bias', 'potential', suggestion),
        cultural: countByCategoryAndType('bias', 'cultural', suggestion),
        racial: countByCategoryAndType('bias', 'racial', suggestion),
        household: countByCategoryAndType('bias', 'household', suggestion),
        disability: countByCategoryAndType('bias', 'disability', suggestion),
      }))
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }
  const getAnalyticsData = async () => {
    if (!authUser) return
    const collections = ['flags', 'acceptedflags', 'ignorelist', 'rewriteflags']
    const snapshots = await Promise.all(collections.map(collectionName => getDocs(collection(db, 'users', authUser.uid, collectionName))))
    const counts = snapshots.map(snapshot => snapshot.docs.reduce((total, doc) => total + doc.data().data.length, 0))
    const [flagSum, acceptedFlagSum, ignoreListCount, rewriteFlagCount] = counts
    setFlags(flagSum)
    setAcceptedFlag(acceptedFlagSum)
    setIgnoreList(ignoreListCount)
    setRewriteFlag(rewriteFlagCount)
  }

  useEffect(() => {
    getAllSuggestions()
  }, [])
  useEffect(() => {
    getAnalyticsData()
  }, [authUser])
  useEffect(() => {
    setAllSuggetion()
  }, [authUser, flags])

  // filter data by selected week and selected specific date
  const totalImprovements = flags !== 0 ? ((acceptedFlag + rewriteFlag) / flags) * 100 : 0

  const filterMainDataByDate = async (startDate: string, endDate: string) => {
    if (authUser && startDate !== null && endDate !== null) {
      setLoading(true)
      const userCollection = collection(db, 'users')
      const userDocRef = doc(userCollection, authUser.uid)
      const flagsCollection = collection(userDocRef, 'flags')
      const flagsData = await getFiltterOutData(flagsCollection, startDate, endDate)
      setFlags(flagsData[0].length)
      const acceptedFlagCollection = collection(userDocRef, 'acceptedflags')
      const acceptedFlagData = await getFiltterOutData(acceptedFlagCollection, startDate, endDate)
      setAcceptedFlag(acceptedFlagData[0].length)
      const rewriteFlagCollection = collection(userDocRef, 'rewriteflags')
      const rewriteFlagData = await getFiltterOutData(rewriteFlagCollection, startDate, endDate)
      setRewriteFlag(rewriteFlagData[0].length)
      const ignorelistCollection = collection(userDocRef, 'ignorelist')
      const ignorelistFlagData = await getFiltterOutData(ignorelistCollection, startDate, endDate)
      setIgnoreList(ignorelistFlagData[0].length)
      setLoading(false)
    }
  }
  const filterSubDataByDate = (startDate: string, endDate: string) => {
    const filteredData = suggestion.filter((item: any) => {
      const itemDate = moment(item.date).format('DD-MM-YYYY')
      const momentStartDate = moment(startDate, 'DD-MM-YYYY')
      const momentEndDate = moment(endDate, 'DD-MM-YYYY')
      return moment(itemDate, 'DD-MM-YYYY').isBetween(momentStartDate, momentEndDate, null, '[]')
    })
    if (startDate && endDate) {
      setSuggestion(filteredData)
    }
    return filteredData
  }
  const onChange = (date: any, type: string) => {
    const isWeekly = type === 'weekly'
    const isRange = type === 'range'
    setRangeDisable(date !== null && isWeekly)
    setWeeklyDisable(date !== null && isRange)
    setCheckboxDisabled((date !== null && isWeekly) || (date !== null && isRange))
    if (date) {
      const startDate = isWeekly ? date.clone().startOf('week').format('DD-MM-YYYY') : date[0].format('DD-MM-YYYY')
      const endDate = isWeekly ? date.clone().endOf('week').format('DD-MM-YYYY') : date[1].format('DD-MM-YYYY')
      filterMainDataByDate(startDate, endDate)
      filterSubDataByDate(startDate, endDate)
    } else {
      getAnalyticsData()
      getAllSuggestions()
    }
  }

  // FIlter for Current Week vs all week
  const [allFlagForWeekData, setAllFlagForWeekData] = useState(Array)
  const [currentWeekFilter, setCurrentWeekFilter] = useState({
    currentWeekFlag: 0,
    currentWeekAcceptedFlag: 0,
    currentWeekRewriteFlag: 0,
    currentWeekIgnoreList: 0,
  })

  const [currentWeekSubFilter, setCurrentWeekSubFilter] = useState({
    totlaFlag: flags,
    currentWeekPotentialFlag: 0,
    currentWeekRacial: 0,
    currentWeekCultural: 0,
    currentWeekHousehold: 0,
    currentWeekDisability: 0,
  })
  const setAllFlagforWeek = async () => {
    const suggestions: any = await DB.suggestion.toArray()
    setAllFlagForWeekData(suggestions)
  }

  const getAllFlagForWeek = () => {
    try {
      setCurrentWeekSubFilter(prevState => ({
        ...prevState,
        currentWeekPotentialFlag: countByCategoryAndType('bias', 'potential', allFlagForWeekData),
        currentWeekRacial: countByCategoryAndType('bias', 'cultural', allFlagForWeekData),
        currentWeekCultural: countByCategoryAndType('bias', 'racial', allFlagForWeekData),
        currentWeekHousehold: countByCategoryAndType('bias', 'household', allFlagForWeekData),
        currentWeekDisability: countByCategoryAndType('bias', 'disability', allFlagForWeekData),
      }))
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }

  const compareCurrentWeekSubData = (startDate: string, endDate: string) => {
    const filteredData = allFlagForWeekData.filter((item: any) => {
      const itemDate = moment(item.date).format('DD-MM-YYYY')
      const momentStartDate = moment(startDate, 'DD-MM-YYYY')
      const momentEndDate = moment(endDate, 'DD-MM-YYYY')
      return moment(itemDate, 'DD-MM-YYYY').isBetween(momentStartDate, momentEndDate, null, '[]')
    })
    if (startDate !== null && endDate !== null) {
      setAllFlagForWeekData(filteredData)
    }
    return filteredData
  }
  const compareCurrentWeekDatta = async (startDate: string, endDate: string) => {
    if (authUser && startDate !== null && endDate !== null) {
      const userCollection = collection(db, 'users')
      const userDocRef = doc(userCollection, authUser.uid)
      const flagsCollection = collection(userDocRef, 'flags')
      const flagsData = await getFiltterOutData(flagsCollection, startDate, endDate)
      setCurrentWeekFilter(prevState => ({
        ...prevState,
        currentWeekFlag: flagsData[0].length,
      }))
      const acceptedFlagCollection = collection(userDocRef, 'acceptedflags')
      const acceptedFlagData = await getFiltterOutData(acceptedFlagCollection, startDate, endDate)
      setCurrentWeekFilter(prevState => ({
        ...prevState,
        currentWeekAcceptedFlag: acceptedFlagData[0].length,
      }))
      const rewriteFlagCollection = collection(userDocRef, 'rewriteflags')
      const rewriteFlagData = await getFiltterOutData(rewriteFlagCollection, startDate, endDate)
      setCurrentWeekFilter(prevState => ({
        ...prevState,
        currentWeekRewriteFlag: rewriteFlagData[0].length,
      }))
      const ignorelistCollection = collection(userDocRef, 'ignorelist')
      const ignorelistFlagData = await getFiltterOutData(ignorelistCollection, startDate, endDate)
      setCurrentWeekFilter(prevState => ({
        ...prevState,
        currentWeekIgnoreList: ignorelistFlagData[0].length,
      }))
    }
  }

  const [weekFIlter, setWeekFilter] = useState(false)
  const onChangeCheckBox = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked
    if (checked) {
      setWeekFilter(true)
      setRangeDisable(true)
      setWeeklyDisable(true)
      const today = moment()
      const startOfWeek = today.clone().startOf('week').format('DD-MM-YYYY')
      const endOfWeek = today.clone().endOf('week').format('DD-MM-YYYY')
      compareCurrentWeekDatta(startOfWeek, endOfWeek)
      compareCurrentWeekSubData(startOfWeek, endOfWeek)
    } else {
      setRangeDisable(false)
      setWeeklyDisable(false)
      setWeekFilter(false)
    }
  }

  useEffect(() => {
    setAllFlagforWeek()
  }, [])
  useEffect(() => {
    getAllFlagForWeek()
  }, [weekFIlter])

  // Sub flags of total fllag section

  const { currentWeekFlag, currentWeekAcceptedFlag, currentWeekRewriteFlag, currentWeekIgnoreList } = currentWeekFilter
  const data: DataItem[] = [
    { label: 'TOTAL FLAGS', value: flags },
    { label: 'CORRECTION ACCEPTED', value: acceptedFlag },
    { label: 'IGNORE LIST', value: ignoreList },
    { label: 'REWRITES AFTER FLAGS', value: rewriteFlag },
  ]
  const CompareData = [
    data,
    [
      { label: 'TOTAL FLAGS', value: currentWeekFlag },
      { label: 'CORRECTION ACCEPTED', value: currentWeekAcceptedFlag },
      { label: 'IGNORE LIST', value: currentWeekIgnoreList },
      { label: 'REWRITES AFTER FLAGS', value: currentWeekRewriteFlag },
    ],
  ]

  const DetailedChart: React.FC<DetailedChartProps> = () => {
    const { potentialFlag, racial, cultural, household, disability } = state
    const { totlaFlag, currentWeekPotentialFlag, currentWeekRacial, currentWeekCultural, currentWeekHousehold, currentWeekDisability } =
      currentWeekSubFilter

    const AllData = [flags, potentialFlag, racial, cultural, household, disability]
    const CurrentWeekData = [
      totlaFlag,
      currentWeekPotentialFlag,
      currentWeekRacial,
      currentWeekCultural,
      currentWeekHousehold,
      currentWeekDisability,
    ]

    let detailedData: Plotly.Data[] = [
      {
        x: subLabels,
        y: AllData,
        type: 'bar',
        name: weekFIlter ? 'AllData' : 'Dataset 1',
        marker: { color: subFlagsColor },
      },
    ]
    if (weekFIlter) {
      detailedData.push({
        x: subLabels,
        y: CurrentWeekData,
        type: 'bar',
        name: 'Current Week Data',
        marker: { color: subFlagsColor },
      })
    }

    const layout: Partial<Plotly.Layout> = {
      title: weekFIlter ? `This Week vs All Data` : 'Individual Analytics',
      xaxis: {
        tickangle: 0,
      },
      width: 1050,
      barmode: 'group',
      bargroupgap: weekFIlter ? 0.1 : 0,
    }

    return <Plot data={detailedData} layout={layout} config={{ displayModeBar: false }} />
  }

  return (
    <>
      {loading && <OverlayLoader />}
      <div className="analytics-main">
        <div className="filter-view">
          <div className="filter-main">
            <div className="filter">
              <div className="filter-title">Anlalytics Filter</div>
              <div className="filter-screen">
                <div className="weekly-filter">
                  <label>Select A Week:</label>
                  <DatePicker
                    onChange={value => onChange(value, 'weekly')}
                    picker="week"
                    style={{ width: 200, height: 40, borderWidth: 1, borderColor: '#999999' }}
                    disabled={weeklyDisable}
                  />
                </div>
                <div className="weekly-filter">
                  <label>Select Specific Date:</label>
                  <RangePicker
                    onChange={value => onChange(value, 'range')}
                    format="DD-MM-YYYY"
                    style={{ height: 39, borderWidth: 1, borderColor: '#999999' }}
                    disabled={rangeDisable}
                  />
                </div>
                <div className="weekly-filter">
                  <Checkbox onChange={onChangeCheckBox} disabled={checkboxDisabled}>
                    Current Week vs All Week
                  </Checkbox>
                </div>
              </div>
            </div>
            <div className="improvements-circle">
              <div className="reaction-emoji">
                {loading
                  ? '🤔'
                  : totalImprovements >= 90
                  ? '😎'
                  : totalImprovements >= 80
                  ? '😊'
                  : totalImprovements >= 50
                  ? '😃'
                  : totalImprovements >= 30
                  ? '🙂'
                  : isNaN(totalImprovements)
                  ? '😐'
                  : '😢'}
              </div>
              <div className="improvement-text">Improvements</div>
              <p className="percentage">{loading ? 'Laoding..' : isNaN(totalImprovements) ? '-' : `${totalImprovements.toFixed(2)}%`}</p>
            </div>
          </div>
        </div>
        <Plot
          data={
            weekFIlter
              ? [
                  {
                    x: CompareData[0].map(item => item.label),
                    y: CompareData[0].map(item => item.value),
                    type: 'bar',
                    mode: 'lines+markers',
                    marker: { color: FlagsColor },
                    name: 'AllData',
                  },
                  {
                    x: CompareData[1].map(item => item.label),
                    y: CompareData[1].map(item => item.value),
                    type: 'bar',
                    mode: 'lines+markers',
                    marker: { color: FlagsColor },
                    name: 'Current Week Data',
                  },
                ]
              : [
                  {
                    x: data.map(item => item.label),
                    y: data.map(item => item.value),
                    type: 'bar',
                    mode: 'lines+markers',
                    marker: { color: FlagsColor },
                  },
                ]
          }
          onClick={event => setSelectedBar(event.points[0]?.pointIndex)}
          layout={{
            title: weekFIlter ? `This Week vs All Data` : 'Individual Analytics',
            width: 1050,
            barmode: 'group',
            bargroupgap: weekFIlter ? 0.1 : 0.3,
          }}
          config={{ displayModeBar: false }}
        />
        {selectedBar !== null && <DetailedChart selectedBar={selectedBar} />}
      </div>
    </>
  )
}

export default SuggestionsPie
