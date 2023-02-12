import React, {useState } from 'react';
// eslint-disable-next-line
import classes from './../styles/ReviewFinder.module.css';
// import { stringify } from 'querystring';

// Hook
function useLocalStorage<T>(key: string, initialValue: T) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState<T>(() => {
      if (typeof window === "undefined") {
        return initialValue;
      }
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });


const ReviewFinder = (props: {visible: 'true' | 'false'}) => {

    // eslint-disable-next-line
    type ValidField = | 'login' | 'repo' | 'black' | 'settingsVisibility';
    // eslint-disable-next-line
    type reviewDataType = {login: string, repo: string, black: string, settingsVisibility: boolean};
/*
    const reviewData: reviewDataType;
    if(!Object.keys(reviewData).length){
        const reviewData: reviewDataType = {login: '', repo: '', black: '', settingsVisibility: false};
        if (localStorage.hasOwnProperty('ReviewFinderData')) {
            const reviewDataTemp = JSON.parse(localStorage.getItem('ReviewFinderData') || '{}');
            console.log('Из стораджа:', reviewDataTemp);
            for (const key in reviewData) {
                if (reviewDataTemp[key] && (typeof reviewDataTemp[key] === 'string' || typeof reviewDataTemp[key] === 'boolean')) {
                    // @ts-expect-error: тупой TS не понимает свой же тип ключа
                    reviewData[key] = reviewDataTemp[key];
                    // console.log('*', key, reviewDataTemp[key]);
                }
            }
            console.log('Получили в реальности:', reviewData);
        }
    }
    */

    const [input, setInput] = useState({login: '', repo: '', black: '', settingsVisibility: false});
    const [name, setName] = useLocalStorage<string>("name", "Bob");
    /*
    if (!Object.keys(input).length) {
        const reviewData: reviewDataType = {login: '', repo: '', black: '', settingsVisibility: false};
        if (localStorage.hasOwnProperty('ReviewFinderData')) {
            const reviewDataTemp = JSON.parse(localStorage.getItem('ReviewFinderData') || '{}');
            console.log('Из стораджа:', reviewDataTemp);
            for (const key in reviewData) {
                if (reviewDataTemp[key] && (typeof reviewDataTemp[key] === 'string' || typeof reviewDataTemp[key] === 'boolean')) {
                    // @ts-expect-error: тупой TS не понимает свой же тип ключа
                    reviewData[key] = reviewDataTemp[key];
                    // console.log('*', key, reviewDataTemp[key]);
                }
            }
            console.log('Получили в реальности:', reviewData);
        }
        setInput(reviewData);
        input = reviewData;
    }
    */
    const changeInput = (field: ValidField, value: string) => {
        const inputData = {...input, ...{[field]: value, settingsVisibility: props.visible === 'true'}};
        setInput(inputData);
        localStorage.setItem('ReviewFinderData', JSON.stringify(inputData));
        console.log('Пишем в сторадж', inputData);
    };

    return (
        <div {...props} className={classes.ReviewFinder}>
            <ul className={classes.ReviewFinderList}>
                <li>
                    Логин: <input
                        type='text'
                        placeholder='Логин текущего юзера'
                        value={input.login}
                        onChange={(e) => changeInput('login', e.target.value)}
                    />
                </li>
                <li>
                    Репозиторий: <input
                        type='text'
                        placeholder='Репозиторий (для поиска ревьюера)'
                        value={input.repo}
                        onChange={(e) => changeInput('repo', e.target.value)}
                    />
                </li>
                <li>
                    Чёрный список: <input
                        type='text'
                        placeholder='Логины, которые не должны быть ревьюерами'
                        value={input.black}
                        onChange={(e) => changeInput('black', e.target.value)}
                    />
                </li>
            </ul>
        </div>
    );
};

export default ReviewFinder;
