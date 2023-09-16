import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'
import { db } from '@common/services/firebase'
import { doc, collection, getDocs, query, where } from 'firebase/firestore'
import { DB } from '@common/helpers/db'
import { useFirebase } from '@common/services/firebase/hook'
import type { DatePickerProps } from 'antd'
import { DatePicker, Checkbox } from 'antd'
import moment from 'moment'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { DataItem, DetailedChartProps, FlagState } from '@common/types/UI'

const SuggestionsPie: React.FC = () => {
  const { RangePicker } = DatePicker
  const { authUser } = useFirebase()
  const [flags, setFlags] = useState(0)
  const [acceptedFlag, setAcceptedFlag] = useState(0)
  const [ignoreList, setIgnoreList] = useState(0)
  const [rewriteFlag, setRewriteFlag] = useState(0)
  const [selectedBar, setSelectedBar] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null)

  const [weeklyDisable, setWeeklyDisable] = useState(false)
  const [rangeDisable, setRangeDisable] = useState(false)
  const [checkboxDisabled, setCheckboxDisabled] = useState(false)

  const initialState: FlagState = {
    subFlagValue: [],
    potentialFlag: 0,
    racial: 0,
    cultural: 0,
    household: 0,
    disability: 0,
  }
  const [state, setState] = useState<FlagState>(initialState)
  const totalImprovements = ((acceptedFlag + rewriteFlag) / flags) * 100

  const setAllSugetion = async () => {
    const suggestions: any[] = await DB.suggestion.toArray()
    setState(prevState => ({
      ...prevState,
      subFlagValue: suggestions,
    }))
    getAllSuggestions()
  }

  const countByCategoryAndType = (category: string, type: string, suggestions: any[]) => {
    return suggestions.filter(flag => flag.category === category && flag.type === type).length
  }
  const getAllSuggestions = () => {
    try {
      setState(prevState => ({
        ...prevState,
        potentialFlag: countByCategoryAndType('bias', 'potential', state.subFlagValue),
        cultural: countByCategoryAndType('bias', 'cultural', state.subFlagValue),
        racial: countByCategoryAndType('bias', 'racial', state.subFlagValue),
        household: countByCategoryAndType('bias', 'household', state.subFlagValue),
        disability: countByCategoryAndType('bias', 'disability', state.subFlagValue),
      }))
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }

  const getFilterSuggestion = (startDate: string, endDate: string) => {
    const filteredData = state.subFlagValue.filter(item => {
      const itemDate = moment(item.date).format('DD-MM-YYYY')
      const momentStartDate = moment(startDate, 'DD-MM-YYYY')
      const momentEndDate = moment(endDate, 'DD-MM-YYYY')
      return moment(itemDate, 'DD-MM-YYYY').isBetween(momentStartDate, momentEndDate, null, '[]')
    })
    if (startDate && endDate) {
      setState(prevState => ({
        ...prevState,
        subFlagValue: filteredData,
      }))
    } else {
      setAllSugetion()
    }
    return filteredData
  }

  const getAnalyticsData = async () => {
    try {
      if (!authUser) return
      if (selectedDate === null) {
        const userCollection = collection(db, 'users')
        const userDocRef = doc(userCollection, authUser.uid)
        const [flagCollection, acceptedFlagsCollection, ignoreListCollection, rewriteflags] = await Promise.all([
          collection(userDocRef, 'flags'),
          collection(userDocRef, 'acceptedflags'),
          collection(userDocRef, 'ignorelist'),
          collection(userDocRef, 'rewriteflags'),
        ])
        const [flagSnapshot, acceptedFlagSnapshot, ignoreListSnapshot, rewriteFlagSnapshot] = await Promise.all([
          getDocs(flagCollection),
          getDocs(acceptedFlagsCollection),
          getDocs(ignoreListCollection),
          getDocs(rewriteflags),
        ])
        const flagSum = flagSnapshot.docs.reduce((total, doc) => total + doc.data().data.length, 0)
        const acceptedFlagSum = acceptedFlagSnapshot.docs.reduce((total, doc) => {
          return total + doc.data().data.reduce((itemTotal, item) => itemTotal + item.value, 0)
        }, 0)
        const ignoreListCount = ignoreListSnapshot.docs.reduce((total, doc) => total + doc.data().data.length, 0)
        const rewriteFlagCount = rewriteFlagSnapshot.docs.reduce((total, doc) => total + doc.data().data.length, 0)
        setFlags(flagSum)
        setAcceptedFlag(acceptedFlagSum)
        setIgnoreList(ignoreListCount)
        setRewriteFlag(rewriteFlagCount)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    setAllSugetion()
    getAllSuggestions()
  }, [flags])
  useEffect(() => {
    getAnalyticsData()
  }, [authUser, selectedDate, flags])
  const [loading, setLoading] = useState(false)
  const filterDataByWeek = async (startDate: string, endDate: string) => {
    if (authUser && startDate !== null && endDate !== null) {
      setLoading(true)
      const userCollection = collection(db, 'users')
      const userDocRef = doc(userCollection, authUser.uid)
      const flagsCollection = collection(userDocRef, 'flags')
      const flagsData = await filterCollectionByDate(flagsCollection, startDate, endDate)
      setFlags(flagsData[0].length)
      const acceptedFlagCollection = collection(userDocRef, 'acceptedflags')
      const acceptedFlagData = await filterCollectionByDate(acceptedFlagCollection, startDate, endDate)
      setAcceptedFlag(acceptedFlagData[0].length)
      const rewriteFlagCollection = collection(userDocRef, 'rewriteflags')
      const rewriteFlagData = await filterCollectionByDate(rewriteFlagCollection, startDate, endDate)
      setRewriteFlag(rewriteFlagData[0].length)
      const ignorelistCollection = collection(userDocRef, 'ignorelist')
      const ignorelistFlagData = await filterCollectionByDate(ignorelistCollection, startDate, endDate)
      setIgnoreList(ignorelistFlagData[0].length)
      setLoading(false)
    }
  }
  const filterCollectionByDate = async (collectionRef, startDate, endDate) => {
    const queryDocs = query(collectionRef)
    try {
      const querySnapshot = await getDocs(queryDocs)
      const filteredData: any = []
      querySnapshot.forEach(data => {
        const newData = data.data().data
        const filtered = newData.filter(item => {
          if (item.timestamp) {
            const itemDate = item.timestamp
            const date = new Date(itemDate.seconds * 1000 + itemDate.nanoseconds / 1000000)
            const formattedDate = moment(date).format('DD-MM-YYYY')
            const momentStartDate = moment(startDate, 'DD-MM-YYYY')
            const momentEndDate = moment(endDate, 'DD-MM-YYYY')
            return moment(formattedDate, 'DD-MM-YYYY').isBetween(momentStartDate, momentEndDate, null, '[]')
          }
        })
        if (startDate !== null && endDate !== null) {
          filteredData.push(filtered)
        }
      })
      return filteredData
    } catch (error) {
      console.error('Error getting documents: ', error)
      return []
    }
  }
  const onChange: DatePickerProps['onChange'] = (date, type) => {
    setSelectedDate(date)
    const isWeekly = type === 'weekly'
    const isRange = type === 'range'
    setRangeDisable(date !== null && isWeekly)
    setWeeklyDisable(date !== null && isRange)
    setCheckboxDisabled((date !== null && isWeekly) || (date !== null && isRange))
    if (date) {
      const startDate = isWeekly ? date.clone().startOf('week') : date[0]
      const endDate = isWeekly ? date.clone().endOf('week') : date[1]
      filterDataByWeek(startDate.format('DD-MM-YYYY'), endDate.format('DD-MM-YYYY'))
      getFilterSuggestion(startDate.format('DD-MM-YYYY'), endDate.format('DD-MM-YYYY'))
    } else {
      setAllSugetion()
      getAnalyticsData()
    }
  }

  // FIlter for Current Week vs all week

  const [currentWeekFilter, setCurrentWeekFilter] = useState({
    currentWeekFlag: 0,
    currentWeekAcceptedFlag: 0,
    currentWeekRewriteFlag: 0,
    currentWeekIgnoreList: 0,
  })

  const [currentWeekSubFilter, setCurrentWeekSubFilter] = useState({
    AllFlagForWeek: [],
    totlaFlag: flags,
    currentWeekPotentialFlag: 0,
    currentWeekRacial: 0,
    currentWeekCultural: 0,
    currentWeekHousehold: 0,
    currentWeekDisability: 0,
  })
  const setAllFlagforWeek = async () => {
    const suggestions: any = await DB.suggestion.toArray()
    setCurrentWeekSubFilter(prevState => ({
      ...prevState,
      AllFlagForWeek: suggestions,
    }))
  }

  const getAllFlagForWeek = () => {
    try {
      setCurrentWeekSubFilter(prevState => ({
        ...prevState,
        currentWeekPotentialFlag: countByCategoryAndType('bias', 'potential', currentWeekSubFilter.AllFlagForWeek),
        currentWeekRacial: countByCategoryAndType('bias', 'cultural', currentWeekSubFilter.AllFlagForWeek),
        currentWeekCultural: countByCategoryAndType('bias', 'racial', currentWeekSubFilter.AllFlagForWeek),
        currentWeekHousehold: countByCategoryAndType('bias', 'household', currentWeekSubFilter.AllFlagForWeek),
        currentWeekDisability: countByCategoryAndType('bias', 'disability', currentWeekSubFilter.AllFlagForWeek),
      }))
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }

  const compareCurrentWeekSubData = (startDate, endDate) => {
    const filteredData: any = state.subFlagValue.filter(item => {
      const itemDate = moment(item.date).format('DD-MM-YYYY')
      const momentStartDate = moment(startDate, 'DD-MM-YYYY')
      const momentEndDate = moment(endDate, 'DD-MM-YYYY')
      return moment(itemDate, 'DD-MM-YYYY').isBetween(momentStartDate, momentEndDate, null, '[]')
    })
    if (startDate !== null && endDate !== null) {
      setCurrentWeekSubFilter(prevState => ({
        ...prevState,
        AllFlagForWeek: filteredData,
      }))
    }
    return filteredData
  }

  const compareCurrentWeekDatta = async (startDate, endDate) => {
    if (authUser && startDate !== null && endDate !== null) {
      const userCollection = collection(db, 'users')
      const userDocRef = doc(userCollection, authUser.uid)
      const flagsCollection = collection(userDocRef, 'flags')
      const flagsData = await filterCollectionByDate(flagsCollection, startDate, endDate)
      setCurrentWeekFilter(prevState => ({
        ...prevState,
        currentWeekFlag: flagsData[0].length,
      }))
      const acceptedFlagCollection = collection(userDocRef, 'acceptedflags')
      const acceptedFlagData = await filterCollectionByDate(acceptedFlagCollection, startDate, endDate)
      setCurrentWeekFilter(prevState => ({
        ...prevState,
        currentWeekAcceptedFlag: acceptedFlagData[0].length,
      }))
      const rewriteFlagCollection = collection(userDocRef, 'rewriteflags')
      const rewriteFlagData = await filterCollectionByDate(rewriteFlagCollection, startDate, endDate)
      setCurrentWeekFilter(prevState => ({
        ...prevState,
        currentWeekRewriteFlag: rewriteFlagData[0].length,
      }))
      const ignorelistCollection = collection(userDocRef, 'ignorelist')
      const ignorelistFlagData = await filterCollectionByDate(ignorelistCollection, startDate, endDate)
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
      const startOfWeek = today.clone().startOf('week')
      const endOfWeek = today.clone().endOf('week')
      compareCurrentWeekDatta(startOfWeek.format('DD-MM-YYYY'), endOfWeek.format('DD-MM-YYYY'))
      compareCurrentWeekSubData(startOfWeek.format('DD-MM-YYYY'), endOfWeek.format('DD-MM-YYYY'))
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

    const labels = ['TOTAL FLAGS', 'POTENTIAL FLAGS', 'RACIAL FLAGS', 'CULTURAL FLAGS', 'HOUSEHOLD FLAGS', 'DISABILITY FLAGS']

    let detailedData: Plotly.Data[] = [
      {
        x: labels,
        y: AllData,
        type: 'bar',
        name: weekFIlter ? 'AllData' : 'Dataset 1',
        marker: { color: ['#FF5C38', '#FCF051', '#262626', '#EFA291', '#FFFFA7', '#999999'] },
      },
    ]
    if (weekFIlter) {
      detailedData.push({
        x: labels,
        y: CurrentWeekData,
        type: 'bar',
        name: 'Current Week Data',
        marker: { color: ['#FF5C38', '#FCF051', '#262626', '#EFA291', '#FFFFA7', '#999999'] },
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
                <label>Select Spesific Date:</label>
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
                ? '😐'
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
                  marker: { color: ['#FF5C38', '#FCF051', '#262626', '#EFA291'] },
                  name: 'AllData',
                },
                {
                  x: CompareData[1].map(item => item.label),
                  y: CompareData[1].map(item => item.value),
                  type: 'bar',
                  mode: 'lines+markers',
                  marker: { color: ['#FF5C38', '#FCF051', '#262626', '#EFA291'] },
                  name: 'Current Week Data',
                },
              ]
            : [
                {
                  x: data.map(item => item.label),
                  y: data.map(item => item.value),
                  type: 'bar',
                  mode: 'lines+markers',
                  marker: { color: ['#FF5C38', '#FCF051', '#262626', '#EFA291'] },
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
  )
}

export default SuggestionsPie
