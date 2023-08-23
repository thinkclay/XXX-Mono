import React, { useEffect, useState } from 'react';
import styles from './demographic.module.scss';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@common/services/firebase'
interface SubOptionsMap {
  [key: string]: string[]; // Index signature: key can be any string, value is an array of strings
}
const ModalPopup = () => {
  const [isModalVisible, setModalVisibility] = useState(true);
  const [isDemographicSelected, setDemographicSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSubOption, setSelectedSubOption] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        console.log("user", user);
      } else {
        console.log("No user found or error:");
      }
    }, error => {
      console.error("Auth state error:", error);
    });
  }, []);


  const closeModal = () => {
    setModalVisibility(false);
  };

  const handleYesClick = () => {
    setDemographicSelected(true);
  };

  const handleCancelClick = () => {
    closeModal();
  };

  const handleOkClick = () => {
    if (selectedOption && (selectedSubOption || selectedOption === 'IEP')) {
      console.log('Selected option:', selectedOption);
      if (selectedSubOption) {
        console.log('Selected sub-option:', selectedSubOption);
      }
      closeModal();
    }
  };

  const subOptionsMap: SubOptionsMap = {
    Gender: ['Female', 'Male', 'Non-binary', 'Unknown'],
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
      'Write-in (with blank space to write in)',
    ],
    Religion: [
      'Baha\'i',
      'Buddhist',
      'Christian',
      'Hindu',
      'Jewish',
      'Muslim',
      'Rastafari',
      'Unknown',
      'Write-in (with blank space to write in)',
    ],
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
      'Write-in (with blank space to write in)',
    ],
    SES: ['Low', 'Medium', 'High', 'Unknown'],
    'IEP status': ['Yes', 'No', 'Unknown'],
  };

  return (
    <div className={`${styles['modal-overlay']} ${isModalVisible ? styles.visible : styles.hidden}`}>
      <div className={styles['modal-container']}>
        <div className={styles['modal-content']}>
          {isDemographicSelected ? (
            <>
              <h2>Select a Demographic Category</h2>
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="">Select an option</option>
                {Object.keys(subOptionsMap).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {selectedOption && selectedOption !== 'IEP' && (
                <select
                  value={selectedSubOption}
                  onChange={(e) => setSelectedSubOption(e.target.value)}
                >
                  <option value="">Select {selectedOption}</option>
                  {subOptionsMap[selectedOption].map((subOption: any) => (
                    <option key={subOption} value={subOption}>
                      {subOption}
                    </option>
                  ))}
                </select>
              )}
              <button className={styles['close-button']} onClick={handleCancelClick}>
                Cancel
              </button>
              <button className={styles['close-button']} onClick={handleOkClick}>
                OK
              </button>
            </>
          ) : (
            <>
              <h2>Modal Title</h2>
              <p>Would you like to select the demographic categories for the subject/recipient of this email/document?</p>
              <button className={styles['close-button']} onClick={handleYesClick}>
                Yes
              </button>
              <button className={styles['close-button']} onClick={handleCancelClick}>
                No
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalPopup;
