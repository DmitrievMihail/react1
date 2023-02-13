import React, {useState } from 'react';
import Select, { MultiValue } from 'react-select';
import useLocalStorage from './../storage';
import loadJSON from './../loader';
// eslint-disable-next-line
import classes from './../styles/ReviewFinder.module.css';
// import { stringify } from 'querystring';

const ReviewFinder = () => {

    // eslint-disable-next-line
    type reviewerType = { 'value': number; 'label': string; 'avatar': string; 'isDisabled'?: boolean};
    let reviewerList: Array<reviewerType> = [
        { value: 0, label: 'Логины отсутствуют', avatar: '', isDisabled: true },
    ];
    let filteredBlack: Array<reviewerType> = []; // Отфильтрованный массив
    const [black, setBlack] = useState(reviewerList);
    const [blackSelected, setblackSelected] = useState(filteredBlack);

    const [disabledReviewerIds, setDisabledReviewerIds] = useState(Array<number>);
    const setBlackList = (e: MultiValue<reviewerType | undefined>) => {
        if (typeof e !== 'undefined') {
            // @ts-expect-error: выше уже проверили undefined
            setblackSelected(e);
            setDisabledReviewerIds(
                // @ts-expect-error: выше уже проверили undefined
                e.map((reviewer: reviewerType) => reviewer.value)
            );
        } else {
            setDisabledReviewerIds([]);
            setblackSelected([]);
        }
    };

    const [showReviewer, setShowReviewer] = useState({id: 0, login: '', avatar: ''});
    const [settingsVisibility, setSettingsVisibility] = useLocalStorage('settingsVisibility', '0');
    const [login, setLogin] = useLocalStorage('login', '');
    const [repo, setRepo] = useLocalStorage('repo', '');

    const [loadingError, setLoadingError] = useState('');

    const loadReviewers = async () => {
        // console.log('Грузим список ревьюеров');
        setShowReviewer({id: 0, login: '', avatar: ''});
        setBlack([]);
        setblackSelected([]);
        try {
            const reviewersData = await loadJSON(`https://api.github.com/repos/${login}/${repo}/contributors`);
            // console.log(reviewersData);
            // eslint-disable-next-line
            type reviewerTypeLoad = { 'id': number; 'avatar_url': string; 'login': string; type: string};
            reviewerList = reviewersData.map((reviewer: reviewerTypeLoad) => {
                return {value: reviewer.id, label: reviewer.login, avatar: reviewer.avatar_url, isDisabled: false };
            });
            // reviewerList.length = 2;
            setBlack(reviewerList);
            // console.log(reviewerList);
            setLoadingError('');
        } catch (err) {
            console.log(err);
            setLoadingError('Ошибка загрузки ревьюеров');
        }
    };

    const getReviewer = () => {
        // console.log('Подбираем ревьюера из списка', disabledReviewerIds);
        filteredBlack = black.filter((reviewer: reviewerType) => {
            return (!disabledReviewerIds.includes(reviewer.value));
        });
        // console.log(black);
        if (!filteredBlack.length) {
            // console.log('В списке нет ревьюверов');
            setShowReviewer({id: 0, login: '', avatar: ''});
        } else {
            const reviewer = filteredBlack[Math.floor(Math.random() * (filteredBlack.length))];
            setShowReviewer({id: reviewer.value, login: reviewer.label, avatar: reviewer.avatar});
        }
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

            {!loadingError ?
                <div>
                    <Select
                    isMulti
                    placeholder="Логины, которые не должны быть ревьюерами"
                    name="colors"
                    value={blackSelected}
                    options={black}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => setBlackList(e)}
                    />

                    <button className={classes.ReviewFindButton} onClick={getReviewer}>Подобрать случайного ревьюера</button>
                    <div className={classes.ReviewerInfo}>
                    {showReviewer.id ?
                        <div>
                            <img src={showReviewer.avatar} style={{width: '100px'}} />
                            <h3>id: <b>{showReviewer.id}</b></h3>
                            <h3>login: <b>{showReviewer.login}</b></h3>
                        </div>
                    :
                        <h3>Ревьюер отсутствует</h3>
                    }
                    </div>
                </div>
            :
                <h3 className={classes.Error}>{loadingError}</h3>
            }
        </div>
    );
};

export default ReviewFinder;
