import { useEffect, FC } from 'react';
import { useDispatch } from 'react-redux';
import { setAppState } from './store/actions';

import './App.css';
import ReviewFinder from './componets/ReviewFinder';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      if (localStorage.getItem('appState')) {
        dispatch(setAppState(JSON.parse(localStorage.getItem('appState') as string)));
      }
    } catch (e) {
      throw new Error(`Ошибка localStorage: ${(e as Error).message}`);
    }
  }, []);

  return (
    <div className="App">
      <h1 className="App_Header">Поиск ревьюера</h1>
      <ReviewFinder />
    </div>
  );
}

export default App;
