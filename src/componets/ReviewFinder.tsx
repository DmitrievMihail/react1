import React, {useState } from 'react';
import Select from 'react-select';
import useLocalStorage from './../storage';
import loadJSON from './../loader';
// eslint-disable-next-line
import classes from './../styles/ReviewFinder.module.css';
// import { stringify } from 'querystring';

const ReviewFinder = () => {

    // eslint-disable-next-line
    type reviewerType = { 'value': number; 'label': string; 'avatar': string; 'isDisabled'?: boolean};
    let reviewerList: Array<reviewerType> = [ // { value: 1, label: 'Purple'},
        { value: 0, label: 'Логины отсутствуют', avatar: '', isDisabled: true },
    ];

    const [settingsVisibility, setSettingsVisibility] = useLocalStorage('settingsVisibility', '0');
    const [login, setLogin] = useLocalStorage('login', '');
    const [repo, setRepo] = useLocalStorage('repo', '');
    const [black, setBlack] = useState(reviewerList);

    const setBlackList = (e: unknown) => {
        console.log(e);
    };

    const loadReviewers = async () => {
        console.log('Грузим список ревьюеров');
        try {
            const reviewersData = await loadJSON(`https://api.github.com/repos/${login}/${repo}/contributors`);
            console.log(reviewersData);
            // reviewerList.length = 0; // Очистили массив перед загрузкой
            // eslint-disable-next-line
            type reviewerTypeLoad = { 'id': number; 'avatar_url': string; 'login': string; type: string};
            reviewerList = reviewersData.map((reviewer: reviewerTypeLoad) => {
                return {value: reviewer.id, label: reviewer.login, avatar: reviewer.avatar_url};
                // Возвращает элемент для new_array
            });
            setBlack(reviewerList);
            console.log(reviewerList);
        } catch (err: unknown) {
            console.log(err);
        }
    };

    const getReviewer = () => {
        console.log('Подбираем ревьюера из списка');
        console.log(reviewerList);
    };

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
                            placeholder='использовал twbs'
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </li>
                    <li>
                        Репозиторий: <input
                            type='text'
                            placeholder='использовал bootstrap'
                            value={repo}
                            onChange={(e) => setRepo(e.target.value)}
                        />
                    </li>
                </ul>
            }
        <button className={classes.ReviewLoadButton} onClick={loadReviewers}>Загрузить ревьюеров</button>

        <Select
            isMulti
            placeholder="Логины, которые не должны быть ревьюерами"
            name="colors"
            options={black}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(e) => setBlackList(e)}
        />

        <button className={classes.ReviewFindButton} onClick={getReviewer}>Подобрать ревьюера</button>
        </div>
    );
};

export default ReviewFinder;
