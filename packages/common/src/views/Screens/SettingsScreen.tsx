import { useEffect, useState } from 'react'
import { Select, Typography, Row, Col, Checkbox } from 'antd'
import { useUser } from 'reactfire'

import {
  disabilityOptions,
  ethnicityOptions,
  genderOptions,
  housingOptions,
  languageOptions,
  religionOptions,
} from '@common/helpers/demographics'
import { MDemographic, defaultDemographic, MUser, getSetting, upsertSetting, MScribe, defaultScribe } from '@common/models'

export default function SettingsScreen() {
  const { status, data: session } = useUser<MUser>()
  const [demographics, setDemographics] = useState<MDemographic>(defaultDemographic)
  const [scribe, setScribe] = useState<MScribe>(defaultScribe)

  useEffect(() => {
    if (status !== 'success' || !session) return
    getSetting(session.uid).then(s => {
      if (!s) return
      setDemographics({ ...demographics, ...s.demographics })
      setScribe({ ...scribe, ...s.scribe })
    })
  }, [status, session])

  useEffect(() => {
    const isDefaultState = demographics === defaultDemographic && scribe === defaultScribe
    if (status !== 'success' || !session || isDefaultState) return
    upsertSetting(session.uid, { scribe, demographics })
  }, [demographics, scribe])

  return (
    <div className="WelcomeScreen">
      <Typography.Title level={1}>Settings</Typography.Title>
      <Typography.Title level={2}>Application Settings</Typography.Title>
      <Typography.Paragraph>You can modify your application and editor settings here.</Typography.Paragraph>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Typography.Title style={{ margin: 0, fontWeight: 400 }} level={4}>
            Formatting
          </Typography.Title>
        </Col>
        <Col span={18}>
          <Checkbox
            style={{ width: '100%' }}
            onChange={e => setScribe({ ...scribe, formatting: e.target.checked })}
            checked={scribe.formatting}
          />
        </Col>
      </Row>

      <br />
      <br />

      <Typography.Title level={2}>Your Demographics</Typography.Title>
      <Typography.Paragraph>
        If you would like, please tell us about your background and demographics. This helps our system better understand you and the biases
        you may have. Remember, bias is not a bad word. We all have it. The first step towards evolving and shaping our biases is to better
        understand our own.
      </Typography.Paragraph>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Typography.Title style={{ margin: 0, fontWeight: 400 }} level={4}>
            Ethnicity
          </Typography.Title>
        </Col>
        <Col span={18}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Select race/ethinicities that you identify with"
            onChange={ethnicity => setDemographics({ ...demographics, ethnicity })}
            options={ethnicityOptions}
            value={demographics.ethnicity}
          />
        </Col>

        <Col span={6}>
          <Typography.Title style={{ margin: 0, fontWeight: 400 }} level={4}>
            Gender
          </Typography.Title>
        </Col>
        <Col span={18}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Select the gender that you identify with"
            onChange={gender => setDemographics({ ...demographics, gender })}
            options={genderOptions}
            value={demographics.gender}
          />
        </Col>

        <Col span={6}>
          <Typography.Title style={{ margin: 0, fontWeight: 400 }} level={4}>
            Language
          </Typography.Title>
        </Col>
        <Col span={18}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Select the languages you speak"
            onChange={language => setDemographics({ ...demographics, language })}
            options={languageOptions}
            value={demographics.language}
          />
        </Col>

        <Col span={6}>
          <Typography.Title style={{ margin: 0, fontWeight: 400 }} level={4}>
            Religion
          </Typography.Title>
        </Col>
        <Col span={18}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Select the religions you practice"
            onChange={religion => setDemographics({ ...demographics, religion })}
            options={religionOptions}
            value={demographics.religion}
          />
        </Col>

        <Col span={6}>
          <Typography.Title style={{ margin: 0, fontWeight: 400 }} level={4}>
            Disability
          </Typography.Title>
        </Col>
        <Col span={18}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Select the disabilities you may have"
            onChange={disability => setDemographics({ ...demographics, disability })}
            options={disabilityOptions}
            value={demographics.disability}
          />
        </Col>

        <Col span={6}>
          <Typography.Title style={{ margin: 0, fontWeight: 400 }} level={4}>
            Housing
          </Typography.Title>
        </Col>
        <Col span={18}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Describe the housing environments you relate to"
            onChange={housing => setDemographics({ ...demographics, housing })}
            options={housingOptions}
            value={demographics.housing}
          />
        </Col>
      </Row>
    </div>
  )
}
