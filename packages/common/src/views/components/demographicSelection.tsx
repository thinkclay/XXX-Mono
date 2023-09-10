import React, { useRef, useState } from 'react';
import { Modal, Select, Space, SelectProps, Typography, Button, Divider, Input } from 'antd';
const { Title } = Typography;
import type { InputRef } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const ethnicityOptions = [
    'Black/African-American',
    'White',
    'Southeast Asian',
    'Indian',
    'Asian',
    'Latino/a/x',
    'Native American or Alaskan Native',
    'Native Hawaiian or Other Pacific Islander',
    'Multiracial/ethnic (specific races/ethnicities unknown)',
    'Ignore/unknown'
];

const genderOptions = [
    { label: 'Non-binary', value: 'Non-binary' },
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Transgender', value: 'Transgender' },
    { label: 'Ignore/unknown', value: 'Ignore/unknown' },
];

const languageOptions = [
    'English',
    'Spanish',
    'Mandarin or Cantonese',
    'Ignore/unknown'
];

const religionOptions = [
    'Hindu',
    'Buddhist',
    'Christian',
    'Jewish',
    'Muslim',
    'Ignore/unknown'
];

const IEPOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
    { label: 'I don’t know', value: 'I don’t know' },
];

const disabilityOptions = [
    'No diagnosed disability',
    'Intellectual disability',
    'Physical disability',
    'Emotional or behavioral disability',
    'Developmental disability',
    'Ignore/unknown'
];

const housingOptions = [
    { label: 'Lives with two parents', value: 'Lives with two parents' },
    { label: 'Lives with one parent', value: 'Lives with one parent' },
    { label: 'Alternative care arrangement (non-parental caregivers)', value: 'Alternative care arrangement (non-parental caregivers)' },
    { label: 'Transient housing', value: 'Transient housing' },
    { label: 'Low socioeconomic status', value: 'Low socioeconomic status' },
    { label: 'Medium socioeconomic status', value: 'Medium socioeconomic status' },
    { label: 'High socioeconomic status', value: 'High socioeconomic status' },
    { label: 'Ignore/unknown', value: 'Ignore/unknown' },
];

const DemographicSelection: React.FC = () => {
    console.log("jmanaa almost fone")
    const [modal1Visible, setModal1Visible] = useState(true);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [modal3Visible, setModal3Visible] = useState(false);
    const [ethnicityOptionsItems, setEthnicityOptionsItems] = useState(ethnicityOptions);
    const [languageOptionsItems, setLanguageOptionsItems] = useState(languageOptions);
    const [religionOptionsItems, setReligionOptionsItems] = useState(religionOptions);
    const [disabilityOptionsItems, setDisabilityOptionsItems] = useState(disabilityOptions);
    const [name, setName] = useState("");
    const inputRef = useRef<InputRef>(null);
    const [selectedValues, setSelectedValues] = useState<any>({
        ethnicity: [],
        gender: [],
        language: [],
        religion: [],
        IEP: [],
        disability: [],
        housing: []
    });
    console.log(selectedValues)
    const handleModal1Ok = () => {
        setModal1Visible(false);
        setTimeout(() => {
            setModal2Visible(true);
        }, 200);
    };

    const handleModal2Ok = () => {
        setModal2Visible(false);
        setTimeout(() => {
            setModal3Visible(true);
        }, 200);
    };

    const handleModal3Ok = () => {
        setModal3Visible(false);
    };
    const genderHandleChange = (value: string) => {
        console.log(`Selected ${name}: ${value}`);
        const updatedSelectedValues = { ...selectedValues, gender: value };
        setSelectedValues(updatedSelectedValues);
    };
    const languageHandleChange = (value: string) => {
        console.log(`Selected ${name}: ${value}`);
        const updatedSelectedValues = { ...selectedValues, ethnicity: value };
        setSelectedValues(updatedSelectedValues);
    };
    const ethnicityHandleChange = (value: string) => {
        console.log(`Selected ${name}: ${value}`);
        const updatedSelectedValues = { ...selectedValues, language: value };
        setSelectedValues(updatedSelectedValues);
    };
    const religionHandleChange = (value: string) => {
        console.log(`Selected ${name}: ${value}`);
        const updatedSelectedValues = { ...selectedValues, religion: value };
        setSelectedValues(updatedSelectedValues);
    };
    const IEPHandleChange = (value: string) => {
        console.log(`Selected ${name}: ${value}`);
        const updatedSelectedValues = { ...selectedValues, IEP: value };
        setSelectedValues(updatedSelectedValues);
    };
    const disabilityHandleChange = (value: string) => {
        console.log(`Selected ${name}: ${value}`);
        const updatedSelectedValues = { ...selectedValues, disability: value };
        setSelectedValues(updatedSelectedValues);
    };
    const housingHandleChange = (value: string) => {
        console.log(`Selected ${name}: ${value}`);
        const updatedSelectedValues = { ...selectedValues, housing: value };
        setSelectedValues(updatedSelectedValues);
    };

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const addItem = (
        e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
        e.preventDefault();
        if (name.trim() === "") {
            return;
        }
        setEthnicityOptionsItems([...ethnicityOptionsItems, name]);
        setLanguageOptionsItems([...languageOptionsItems, name]);
        setReligionOptionsItems([...religionOptionsItems, name]);
        setDisabilityOptionsItems([...disabilityOptionsItems, name]);
        setName("");
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    return (
        <>
            <div>
                <Modal
                    title="Demographic Category Selection"
                    centered
                    okText="Yes"
                    cancelText="No"
                    open={modal1Visible}
                    onOk={handleModal1Ok}
                    onCancel={() => setModal1Visible(false)}
                >
                    <p style={{ fontSize: 16 }}>Would you like to select the demographic categories for the subject/recipient of this email/document?</p>
                </Modal>
                <Modal
                    open={modal2Visible}
                    onOk={handleModal2Ok}
                    onCancel={() => setModal2Visible(false)}
                >
                    <Divider style={{ fontSize: 18 }}>Select demographic characteristics</Divider>
                    <Space style={{ width: '100%' }} direction="vertical">
                        <Title style={{ margin: 0, fontWeight: 400 }} level={5}> Race/ethnicity</Title>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select race/ethnicity"
                            onChange={ethnicityHandleChange}
                            dropdownRender={(menu) => (
                                <>
                                    {menu}
                                    <Divider style={{ margin: "8px 0" }} />
                                    <Space style={{ padding: "0 8px 4px" }}>
                                        <Input
                                            placeholder="Please enter your race/ethnicity"
                                            ref={inputRef}
                                            value={name}
                                            onChange={onNameChange}
                                        />
                                        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                            Add item
                                        </Button>
                                    </Space>
                                </>
                            )}
                            options={ethnicityOptionsItems.map((item) => ({ label: item, value: item }))}
                        />
                        <Title style={{ margin: 0, fontWeight: 400 }} level={5}>Gender identification</Title>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select Gender"
                            onChange={genderHandleChange}
                            options={genderOptions}
                        />
                        <Title style={{ margin: 0, fontWeight: 400 }} level={5}>Language spoken at home</Title>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select language"
                            onChange={languageHandleChange}
                            dropdownRender={(menu) => (
                                <>
                                    {menu}
                                    <Divider style={{ margin: "8px 0" }} />
                                    <Space style={{ padding: "0 8px 4px" }}>
                                        <Input
                                            placeholder="Please enter your language"
                                            ref={inputRef}
                                            value={name}
                                            onChange={onNameChange}
                                        />
                                        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                            Add item
                                        </Button>
                                    </Space>
                                </>
                            )}
                            options={languageOptionsItems.map((item) => ({ label: item, value: item }))}
                        />
                        <Title style={{ margin: 0, fontWeight: 400 }} level={5}>Religion </Title>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select religion"
                            onChange={religionHandleChange}
                            dropdownRender={(menu) => (
                                <>
                                    {menu}
                                    <Divider style={{ margin: "8px 0" }} />
                                    <Space style={{ padding: "0 8px 4px" }}>
                                        <Input
                                            placeholder="Please enter your religion "
                                            ref={inputRef}
                                            value={name}
                                            onChange={onNameChange}
                                        />
                                        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                            Add item
                                        </Button>
                                    </Space>
                                </>
                            )}
                            options={religionOptionsItems.map((item) => ({ label: item, value: item }))}
                        />
                        <Title style={{ margin: 0, fontWeight: 400 }} level={5}>Does this student have an IEP?</Title>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            onChange={IEPHandleChange}
                            options={IEPOptions}
                        />
                        <Title style={{ margin: 0, fontWeight: 400 }} level={5}>Disability status</Title>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select disability status"
                            onChange={disabilityHandleChange}
                            dropdownRender={(menu) => (
                                <>
                                    {menu}
                                    <Divider style={{ margin: "8px 0" }} />
                                    <Space style={{ padding: "0 8px 4px" }}>
                                        <Input
                                            placeholder="Please enter your disability status"
                                            ref={inputRef}
                                            value={name}
                                            onChange={onNameChange}
                                        />
                                        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                            Add item
                                        </Button>
                                    </Space>
                                </>
                            )}
                            options={disabilityOptionsItems.map((item) => ({ label: item, value: item }))}
                        />
                        <Title style={{ margin: 0, fontWeight: 400 }} level={5}>Additional household information </Title>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%', marginBottom: 10 }}
                            placeholder="Please select additional household information"
                            onChange={housingHandleChange}
                            options={housingOptions}
                        />
                    </Space>
                </Modal>

                <Modal
                    title="Remember for Next Time"
                    open={modal3Visible}
                    centered
                    okText="Yes"
                    cancelText="No"
                    onOk={handleModal3Ok}
                    onCancel={() => setModal3Visible(false)}
                >
                    <p style={{ fontSize: 16 }} >Would you like to store this information for the next time you write to/about this person?</p>
                </Modal>
            </div>
        </>
    );
};

export default DemographicSelection;
