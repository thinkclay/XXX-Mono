import { useEffect, useState } from 'react'
import { useUser } from 'reactfire'
import { Typography, Tabs, TabsProps } from 'antd'

import SuggestionsPie from '@common/views/Analytics/SuggestionsPie'
import { MSuggestion, getSuggestionsByUser } from '@common/models'
import GlobalBias from '../Analytics/GlobalBias'
import GlobalLanguage from '../Analytics/GlobalLanguage'

const onChange = (key: string) => {
  console.log(key)
}

export default function Settings() {
  const { data: user } = useUser()
  const [suggestions, setSuggestions] = useState<MSuggestion[]>([])

  useEffect(() => {
    if (!user || !user.uid) return

    const fetchData = async () => {
      // See getSuggestionsByUser for an example of how we should build complex queries
      // this allows us to isolate and keep our queries in the model and not polute the rendering component
      // Let's refactor the <SuggestionsPie /> component using dedicated helper functions
      const suggestionsData = await getSuggestionsByUser(user.uid)
      setSuggestions(suggestionsData)
    }

    fetchData()
  }, [user])

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Global Bias',
      children: <GlobalBias />,
    },
    {
      key: '2',
      label: 'Global Language',
      children: <GlobalLanguage />,
    },
    {
      key: '3',
      label: 'My Trends',
      children: <SuggestionsPie />,
    },
  ]

  return (
    <div className="WelcomeScreen">
      <Typography.Title level={1}>Settings</Typography.Title>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}
