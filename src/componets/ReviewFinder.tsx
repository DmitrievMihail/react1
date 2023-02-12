import React, {useState } from 'react';
import useLocalStorage from './../storage';
// eslint-disable-next-line
import classes from './../styles/ReviewFinder.module.css';
// import { stringify } from 'querystring';

const ReviewFinder = () => { // props: {visible: 'true' | 'false'}

    const [settingsVisibility, setSettingsVisibility] = useLocalStorage('settingsVisibility', '0');
    const toggleVisibility = () => {
        setSettingsVisibility(settingsVisibility === '0' ? '1' : '0');
        console.log(settingsVisibility);
    };

    const [login, setLogin] = useLocalStorage('login', '');
    const [repo, setRepo] = useLocalStorage('repo', '');
    const [black, setBlack] = useLocalStorage('black', '');

    return (
        <div className={classes.ReviewFinder}>
            <button
                className="settingsButton"
                onClick={(e) => setSettingsVisibility(settingsVisibility === '0' ? '1' : '0')}
            >{settingsVisibility === '1' ? 'Скрыть' : 'Показать'} настройки</button>

            {settingsVisibility === '0' ?
                <span></span>
            :
                <ul className={classes.ReviewFinderList}>
                    <li>
                        Логин: <input
                            type='text'
                            placeholder='Логин текущего юзера'
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </li>
                    <li>
                        Репозиторий: <input
                            type='text'
                            placeholder='Репозиторий (для поиска ревьюера)'
                            value={repo}
                            onChange={(e) => setRepo(e.target.value)}
                        />
                    </li>
                    <li>
                        Чёрный список: <input
                            type='text'
                            placeholder='Логины, которые не должны быть ревьюерами'
                            value={black}
                            onChange={(e) => setBlack(e.target.value)}
                        />
                    </li>
                </ul>
            }
        </div>
    );
};

export default ReviewFinder;
