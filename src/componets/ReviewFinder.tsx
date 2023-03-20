import React, {useState } from 'react';
import { Provider } from 'react-redux';
// import { store } from './redux/store';
import Select from 'react-select';
import ErrorMsg from './ErrorMsg';
import {reviewerType, reviewerTypeLoad, reviewBlackList, showReviewerDefault, showReviewerType} from './../types/ReviewFinder';
import ReviewFinderSettings from './ReviewFinderSettings';
import useLocalStorage from './../storage';
import loadJSON from './../loader';
// eslint-disable-next-line
import classes from './../styles/ReviewFinder.module.css';
import ReviewInfo from './ReviewInfo';

const ReviewFinder = () => {

    let reviewerList: reviewBlackList = [
        {value: 0, label: 'Логины отсутствуют', avatar: '', isDisabled: true},
    ];
    let filteredBlack: reviewBlackList = []; // Отфильтрованный массив
    const [black, setBlack] = useState(reviewerList);
    const [blackSelected, setblackSelected] = useState(filteredBlack);

    const [disabledReviewerIds, setDisabledReviewerIds] = useState<Array<number>>([]);

    const [showReviewer, setShowReviewer] = useState(showReviewerDefault);
    const [isVisibleSettings, setSettingsVisibility] = useLocalStorage('isVisibleSettings', false);

    const [loadingError, setLoadingError] = useState('');

    const [login, setLogin] = useLocalStorage('login', '');
    const [repo, setRepo] = useLocalStorage('repo', '');

    const loadReviewers = async () => {
        // console.log('Грузим список ревьюеров');
        setShowReviewer(showReviewerDefault);
        setBlack([]);
        setblackSelected([]);
        try {
            const reviewersData = await loadJSON(`https://api.github.com/repos/${login}/${repo}/contributors`);
            // console.log(reviewersData);
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
            setShowReviewer(showReviewerDefault);
        } else {
            const reviewer = filteredBlack[Math.floor(Math.random() * (filteredBlack.length))];
            setShowReviewer({id: reviewer.value, login: reviewer.label, avatar: reviewer.avatar});
        }
    };

    // repo={getRepo} login={getLogin}
    // <ReviewFinderSettings msg=''/>

    return (
        <div className={classes.ReviewFinder}>
            <button
                className="settingsButton"
                onClick={() => setSettingsVisibility(!isVisibleSettings)}
            >{isVisibleSettings ? 'Показать' : 'Скрыть'} настройки</button>

            {!isVisibleSettings ?
                 <ReviewFinderSettings login={login as string} setLogin={setLogin as Function} repo={repo as string} setRepo={setRepo as Function} />
                :
                <span></span>
            }
            <button className={classes.ReviewLoadButton} onClick={loadReviewers} type='button'>Загрузить ревьюеров</button>

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
                    onChange={(e) => {

                        if (typeof e !== 'undefined') {
                            setblackSelected(e);
                            setDisabledReviewerIds(
                                e.map((reviewer: reviewerType) => reviewer.value)
                            );
                        } else {
                            setDisabledReviewerIds([]);
                            setblackSelected([]);
                        }

                    }}
                    />

                    <button className={classes.ReviewFindButton} onClick={getReviewer}>Подобрать случайного ревьюера</button>

                    <ReviewInfo {...showReviewer} />
                </div>
            :
                <ErrorMsg msg={loadingError} />
            }
        </div>
    );
};

export default ReviewFinder;
