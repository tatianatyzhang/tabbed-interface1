import React, { useState } from 'react';
import Select from 'react-select';
import './App.css';

export default function ModeSelection() {
  // Define options for each dropdown
  const gameOptions = [{ value: 'matching', label: 'Matching Game' }];
  const selectionTypeOptions = [
    { value: 'random', label: 'Random' },
    { value: 'theme', label: 'By Theme' },
    { value: 'pos', label: 'By POS' },
  ];

  // Initialize state as objects for react-select
  const [gameType, setGameType] = useState(gameOptions[0]);
  const [selectionType, setSelectionType] = useState(selectionTypeOptions[0]);
  const [themeOrPosSelection, setThemeOrPosSelection] = useState({ value: 'random', label: 'Random' });
  const [frequency, setFrequency] = useState({ min: '0', max: '6000' });
  const [vocalization, setVocalization] = useState(false);
  const [problemCount, setProblemCount] = useState(10);
  const handleFrequencyChange = (e, type) => {
    const value = e.target.value;
    // Allow empty value or one that only contains digits
    if (value === '' || /^\d+$/.test(value)) {
      setFrequency({ ...frequency, [type]: value });
    }
  };
  

  // Dynamically set options for third dropdown based on selectionType
  let dynamicOptions = [];
  if (selectionType.value === 'random') {
    dynamicOptions = [{ value: 'random', label: 'Random' }];
  } else if (selectionType.value === 'theme') {
    dynamicOptions = [
      { value: '', label: 'Select Theme', isDisabled: true },
      { value: 'body-parts', label: 'Body Parts' },
      { value: 'ritual-religion', label: 'Ritual and Religion' },
      { value: 'government-law', label: 'Government and Law' },
    ];
  } else if (selectionType.value === 'pos') {
    dynamicOptions = [
      { value: '', label: 'Select Part of Speech', isDisabled: true },
      { value: 'pronouns', label: 'Pronouns' },
      { value: 'nouns', label: 'Nouns' },
      { value: 'adjectives', label: 'Adjectives' },
      { value: 'verbs', label: 'Verbs' },
    ];
  }

  return (
    <div className='panel wide-panel'>
      {/* First row with three dropdowns */}
      <div
        className='dropdown-row'
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          justifyContent: 'center',
        }}
      >
        {/* First Dropdown - Game Type */}
        <div className='dropdown-container'>
          <Select
            value={gameType}
            onChange={setGameType}
            options={gameOptions}
            isSearchable={false}
            styles={{
              container: (provided) => ({ ...provided, width: 220 }),
            }}
          />
        </div>

        {/* Second Dropdown - Selection Type */}
        <div className='dropdown-container'>
          <Select
            value={selectionType}
            onChange={(option) => {
              setSelectionType(option);
              // Reset the third dropdown when selection type changes
              if (option.value === 'random') {
                setThemeOrPosSelection({ value: 'random', label: 'Random' });
              } else {
                setThemeOrPosSelection(null);
              }
            }}
            options={selectionTypeOptions}
            isSearchable={false}
            styles={{
              container: (provided) => ({ ...provided, width: 220 }),
            }}
          />
        </div>

        {/* Third Dropdown - Dynamic options based on second dropdown */}
        <div className='dropdown-container'>
          <Select
            value={themeOrPosSelection}
            onChange={setThemeOrPosSelection}
            options={dynamicOptions}
            isSearchable={false}
            styles={{
              container: (provided) => ({ ...provided, width: 220 }),
            }}
          />
        </div>
      </div>

      {/* Second row - Frequency inputs */}
      <div
        className='frequency-row'
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '20px',
        }}
      >
        {/* Min Frequency */}
        <div>
          <input
            type='number'
            value={frequency.min}
            onChange={e => handleFrequencyChange(e, 'min')}
            className='fixed-width-input'
            style={{
              height: '20px',
              paddingTop: '10px',
              width: '220px',
              fontSize: '18px',
            }}
            disabled={selectionType.value === 'theme'}
          />
          <div className='input-label'>Min Frequency</div>
        </div>

        {/* Max Frequency */}
        <div>
          <input
            type='number'
            value={frequency.max}
            onChange={e => handleFrequencyChange(e, 'max')}
            className='fixed-width-input'
            style={{
              height: '20px',
              paddingTop: '10px',
              width: '220px',
              fontSize: '18px',
            }}
            disabled={selectionType.value === 'theme'}
          />
          <div className='input-label'>Max Frequency</div>
        </div>
      </div>

      {/* Vocalization Mode Toggle */}
      <div className='vocalization-toggle'>
        <div style={{fontWeight: 'bold'}}>Vocalization Mode:</div>
        <label className='switch-label'>
          <input
            type='checkbox'
            checked={vocalization}
            onChange={() => setVocalization(!vocalization)}
          />
          <span className='switch-text'>
            {vocalization ? 'Vocalize' : 'Unvocalize'}
          </span>
        </label>
      </div>

      {/* Slider Feature */}
      <div className='slider-section'>
        <div style={{fontWeight: 'bold'}} className='slider-question'>
          How many problems would you like to do?
        </div>
        <div className='slider-wrapper'>
          <input
            type='range'
            min='1'
            max='20'
            step='1'
            value={problemCount}
            onChange={e => setProblemCount(parseInt(e.target.value))}
            className='problem-slider'
          />
          <div className='slider-value'>{problemCount}</div>
        </div>
        <div className='slider-warning'>
          <i>
            If the slider value exceeds the maximum possible number of unique
            prompts, the slider will be automatically readjusted.
          </i>
        </div>
      </div>

      {/* Start Button */}
      <div className='start-button-container'>
        <button className='start-button'>Start</button>
      </div>
    </div>
  );
}
