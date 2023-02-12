// eslint-disable-next-line
import React, { useState, useRef, useMemo } from 'react';
import './App.css';
import ReviewFinder from './componets/ReviewFinder';

function App() {

  return (
    <div className="App">
      <h1 className="App_Header">Поиск ревьюера</h1>
      <ReviewFinder />
    </div>
  );
}

export default App;
