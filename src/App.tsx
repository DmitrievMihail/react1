// eslint-disable-next-line
import React, { useState, useRef, useMemo } from 'react';
import './App.css';
import ReviewFinder from './componets/ReviewFinder';

function App() {

  const loadReviewers = () => {
    console.log('Грузим список ревьюеров');
  };

  const getReviewer = () => {
    console.log('Подбираем ревьюера из списка');
  };

  return (
    <div className="App">
      <h1 className="App_Header">Поиск ревьюера</h1>
      <ReviewFinder />
      <button className="loadButton" onClick={loadReviewers}>Загрузить ревьюеров</button>
      <button className="findButton" onClick={getReviewer}>Подобрать ревьюера</button>
    </div>
  );
}

export default App;
