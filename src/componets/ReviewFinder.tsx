import React, {useState } from 'react';
import { Provider } from 'react-redux';
// import { store } from './redux/store';
import Select from 'react-select';
import ErrorMsg from './ErrorMsg';
import {reviewerType, reviewerTypeLoad, ReviewBlackList} from './../types/ReviewFinder';
import ReviewFinderSettings from './ReviewFinderSettings';
import useLocalStorage from './../storage';
import loadJSON from './../loader';
// eslint-disable-next-line
import classes from './../styles/ReviewFinder.module.css';

const ReviewFinder = () => {

    let reviewerList: ReviewBlackList = [
        { value: 0, label: 'Логины отсутствуют', avatar: '', isDisabled: true },
    ];
    let filteredBlack: ReviewBlackList = []; // Отфильтрованный массив
    const [black, setBlack] = useState(reviewerList);
    const [blackSelected, setblackSelected] = useState(filteredBlack);

    const [disabledReviewerIds, setDisabledReviewerIds] = useState<Array<number>>([]);

    const [showReviewer, setShowReviewer] = useState({id: 0, login: '', avatar: ''});
    const [isVisibleSettings, setSettingsVisibility] = useLocalStorage('isVisibleSettings', false);

    const [loadingError, setLoadingError] = useState('');

    const [login, setLogin] = useLocalStorage('login', '');
    const [repo, setRepo] = useLocalStorage('repo', '');

    const loadReviewers = async () => {
        // console.log('Грузим список ревьюеров');
        setShowReviewer({id: 0, login: '', avatar: ''});
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
            setShowReviewer({id: 0, login: '', avatar: ''});
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
                 <ReviewFinderSettings login={login} setLogin={setLogin} repo={repo} setRepo={setRepo} />
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
                    <div className={classes.ReviewerInfo}>
                    {showReviewer.id ?
                        <div>
                            <img src={showReviewer.avatar} style={{width: '100px'}} alt={showReviewer.login} />
                            <h3>id: <b>{showReviewer.id}</b></h3>
                            <h3>login: <b>{showReviewer.login}</b></h3>
                        </div>
                    :
                        <h3>Ревьюер отсутствует</h3>
                    }
                    </div>
                </div>
            :
                <ErrorMsg msg={loadingError} />
            }
        </div>
    );
};

export default ReviewFinder;
