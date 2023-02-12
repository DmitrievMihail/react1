import React, {useState} from 'react';
// eslint-disable-next-line
import classes from './../styles/ReviewFinder.module.css';
// import { stringify } from 'querystring';

const ReviewFinder = (props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>) => {

    // eslint-disable-next-line
    type ValidField = | 'login' | 'repo' | 'black';
    // eslint-disable-next-line
    type reviewDataType = {login: string, repo: string, black: string};
    const reviewData: reviewDataType = {login: '', repo: '', black: ''};
    if (localStorage.hasOwnProperty('ReviewFinderData') && localStorage.getItem('ReviewFinderData')) {
        const reviewDataTemp = JSON.parse(localStorage.getItem('ReviewFinderData') || '{}');
        for (const key in reviewData) {
            if (reviewDataTemp[key] && (typeof reviewDataTemp[key] === 'string')) {
                // @ts-expect-error: тупой TS не понимает свой же тип ключа
                reviewData[key] = reviewDataTemp[key];
            }
        }
    }

    const [input, setInput] = useState(reviewData);
    const changeInput = (field: ValidField, value: string) => {
        setInput({...input, [field]: value});
        localStorage.setItem('ReviewFinderData', JSON.stringify(input));
        console.log(input);
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
            {props.children}
        </div>
    );
};

export default ReviewFinder;
