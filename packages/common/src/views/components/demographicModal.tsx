import React, { useState } from 'react'
import styles from './demographic.module.scss'

function ModalPopup() {
  const [isModalVisible, setModalVisibility] = useState(true)
  const [isDemographicSelected, setDemographicSelected] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [isAddOptionPopupVisible, setAddOptionPopupVisibility] = useState(false)
  const [newOptionValue, setNewOptionValue] = useState('')
  const [currentKey, setCurrentKey] = useState('')

  const closeModal = () => {
    setModalVisibility(false)
  }

  const handleYesClick = () => {
    setDemographicSelected(true)
  }

  const handleCancelClick = () => {
    closeModal()
  }

  const openAddOptionPopup = () => {
    setAddOptionPopupVisibility(true)
  }

  const closeAddOptionPopup = () => {
    setAddOptionPopupVisibility(false)
    setNewOptionValue('')
  }

  const handleAddOption = () => {
    if (newOptionValue.trim() === '') {
      return
    }

    const updatedSubOptionsMap = {
      ...subOptionsMap,
      [currentKey]: [...subOptionsMap[currentKey], newOptionValue],
    }

    setSubOptionsMap(updatedSubOptionsMap)

    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [currentKey]: newOptionValue,
    }))

    closeAddOptionPopup()
  }

  const handleOptionChange = (key, value) => {
    if (value === 'add-option') {
      openAddOptionPopup()
      setCurrentKey(key)
    } else if (value === 'ignore') {
      setSelectedOptions(prevOptions => {
        const updatedOptions = { ...prevOptions }
        delete updatedOptions[key]
        return updatedOptions
      })
    } else {
      setSelectedOptions(prevOptions => ({
        ...prevOptions,
        [key]: value,
      }))
    }
  }

  const handleOkButtonClick = () => {
    if (Object.keys(selectedOptions).length === 0) {
      alert('Please select option')
      return
    }
    console.log(selectedOptions)
    closeModal()
  }

  const subOptionsMapInitial = {
    Gender: ['Female', 'Male', 'Non-binary', 'Unknown', 'ignore'],
    Race: [
      'African-American',
      'Alaskan Native',
      'Asian (with space to specify)',
      'Black',
      'Hawaiian',
      'Indian',
      'Latinx',
      'Native American',
      'Pacific Islander',
      'Unknown',
      'ignore',
      'add-option',
    ],
    Religion: ["Baha'i", 'Buddhist', 'Christian', 'Hindu', 'Jewish', 'Muslim', 'Rastafari', 'Unknown', 'ignore', 'add-option'],
    'Language spoken at home': [
      'Amharic',
      'English',
      'French',
      'German',
      'Hausa',
      'Hindi',
      'Italian',
      'Spanish',
      'Swahili',
      'Yoruba',
      'Unknown',
      'ignore',
      'add-option',
    ],
    SES: ['Low', 'Medium', 'High', 'Unknown', 'ignore'],
    'IEP status': ['Yes', 'No', 'Unknown', 'ignore'],
  }
  const [subOptionsMap, setSubOptionsMap] = useState(subOptionsMapInitial)

  return (
    <div className={`${styles['modal-overlay']} ${isModalVisible ? styles.visible : styles.hidden}`}>
      <div className={styles['modal-container']}>
        <div className={styles['modal-content']}>
          {isDemographicSelected ? (
            <>
              <h2>Select a Demographic Category</h2>
              {Object.keys(subOptionsMap).map(key => (
                <div key={key} className={styles['select-option']}>
                  <label>{key}</label>
                  <select value={selectedOptions[key] || 'select-option'} onChange={e => handleOptionChange(key, e.target.value)}>
                    <option value="select-option" disabled>
                      Select option
                    </option>
                    {subOptionsMap[key].map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <div className={styles['button-view']}>
                <button className={styles['close-button']} onClick={handleCancelClick}>
                  Cancel
                </button>
                <button className={styles['close-button']} onClick={handleOkButtonClick}>
                  OK
                </button>
              </div>
            </>
          ) : (
            <div className={styles['quation-modal']}>
              <p>Would you like to select the demographic categories for the subject/recipient of this email/document?</p>
              <div className={styles['button-view']}>
                <button className={styles['close-button']} onClick={handleYesClick}>
                  Yes
                </button>
                <button className={styles['close-button']} onClick={handleCancelClick}>
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {isAddOptionPopupVisible && (
        <div className={styles['add-option-popup']}>
          <input
            type="text"
            placeholder={`Enter new ${currentKey}`}
            value={newOptionValue}
            onChange={e => setNewOptionValue(e.target.value)}
          />
          <div className={styles['button-view']}>
            <button className={styles['close-button']} onClick={handleAddOption}>
              Add
            </button>
            <button className={styles['close-button']} onClick={closeAddOptionPopup}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ModalPopup
