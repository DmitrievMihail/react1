// eslint-disable-next-line
import React, { useState, useRef, useMemo } from 'react';
import './App.css';
import ReviewFinder from './componets/ReviewFinder';

function App() {
  const [settingsVisibility, setSettingsVisibility] = useState(false);
  const toggleSettings = () => {
    setSettingsVisibility(!settingsVisibility);
  };
  return (
    <div className="App">
      <button className="settingsButton" onClick={toggleSettings}>{settingsVisibility ? 'Скрыть' : 'Показать'} настройки</button>

      {settingsVisibility
        ? <ReviewFinder />
        : <span></span>
      }
    </div>
  );
}

export default App;
