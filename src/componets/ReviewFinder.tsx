import {FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { State} from '../store/reducer';
import { setBlacklist, toggleVisibility } from '../store/actions';
import Select from 'react-select';
import ErrorMsg from './ErrorMsg';
import {reviewerType, reviewerTypeLoad, reviewBlackList, showReviewerDefault, showReviewerType, searchListType} from './../types/ReviewFinder';
import ReviewFinderSettings from './ReviewFinderSettings';
import loadJSON from './../loader';
// eslint-disable-next-line
import classes from './../styles/ReviewFinder.module.css';
import ReviewInfo from './ReviewInfo';
import { DispatchSettings, loadReviewers } from '../models/fetchUserData';

const ReviewFinder: FC = () => {

    const reviewerList: reviewBlackList = [
        {value: 0, label: 'Логины отсутствуют', avatar: '', isDisabled: true},
    ];
    let filteredBlack: reviewBlackList = []; // Отфильтрованный массив
    const [black, setBlack] = useState(reviewerList);
    const [blackSelected, setblackSelected] = useState(filteredBlack);

    const [disabledReviewerIds, setDisabledReviewerIds] = useState<Array<number>>([]);

    const [showReviewer, setShowReviewer] = useState(showReviewerDefault);
    const isVisible = useSelector((state: State) => state.visible);

    const [loadingReviewer, setLoadingReviewer] = useState<boolean>(false);
    // const [loadingError, setLoadingError] = useState('');
    let loadingError = '';

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

    const dispatch = useDispatch() as DispatchSettings;

    // onClick={loadReviewers}

    const [searchList, setSearchList] = useState<Array<searchListType>>([]);

    const showRandomReviewer = useCallback((): void => {
        // if (contributors) {
            const count = Math.floor(Math.random() * (searchList.length - 1));

            dispatch(
                setBlacklist([''])
                /*
                setReviewer({
                login: searchList[count].login,
                avatarUrl: searchList[count].avatar_url,
                htmlUrl: searchList[count].html_url,
            }) */
            );
                    // }
    }, [searchList]);

    useEffect(() => {
        let searchInterval: NodeJS.Timer;
        if (loadingReviewer) {
            searchInterval = setInterval(() => showRandomReviewer, 200);
        }

        return () => {
              clearInterval(searchInterval);
        };
    }, [loadingReviewer, showRandomReviewer]);

    const handleClick = (): void => {
        // if (blacklist.length !== contributors.length) {
            loadingError = '';
            setLoadingReviewer(true);
            setTimeout(() => setLoadingReviewer(false), 2000);
        // } else {
        //    setError(true);
        // }
    };

    return (
        <div className={classes.ReviewFinder}>
            <button
                className="settingsButton"
                onClick={() => dispatch(toggleVisibility())}
            >{isVisible ? 'Скрыть' : 'Показать' } настройки</button>

            {isVisible ? <ReviewFinderSettings /> : null}

            <button className={classes.ReviewLoadButton} onClick={handleClick} type='button'>Загрузить ревьюеров</button>

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
