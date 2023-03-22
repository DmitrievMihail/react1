import {FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { State} from '../store/reducer';
import { setBlack, setblackSelected, toggleVisibility } from '../store/actions';
import Select from 'react-select';
import ErrorMsg from './ErrorMsg';
import {reviewerType, reviewerTypeLoad, reviewBlackList, showReviewerDefault, showReviewerType, searchListType} from './../types/ReviewFinder';
import ReviewFinderSettings from './ReviewFinderSettings';
import loadJSON from './../loader';
// eslint-disable-next-line
import classes from './../styles/ReviewFinder.module.css';
import ReviewInfo from './ReviewInfo';
import fetchUserData, { DispatchSettings } from '../models/fetchUserData';

const ReviewFinder: FC = () => {

    const reviewerList: reviewBlackList = [
        {value: 0, label: 'Логины отсутствуют', avatar: '', isDisabled: true},
    ];
    const filteredBlack: reviewBlackList = []; // Отфильтрованный массив
    // const [black, setBlack] = useState(reviewerList);
    // const [blackSelected, setblackSelected] = useState(filteredBlack);

    const [disabledReviewerIds, setDisabledReviewerIds] = useState<Array<number>>([]);

    const [showReviewer, setShowReviewer] = useState(showReviewerDefault);
    const isVisible = useSelector((state: State) => state.visible);
    const blacklist = useSelector((state: State) => state.blacklist);
    const blackSelected = useSelector((state: State) => state.blackSelected);

    const [loadingReviewer, setLoadingReviewer] = useState<boolean>(false);
    const [loadingError, setLoadingError] = useState('');

    const getReviewer = () => {
        /*
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
        */
    };

    const dispatch = useDispatch() as DispatchSettings;

    const handleLoadReviewers = () => {
        setLoadingError('');
        dispatch(fetchUserData()).catch((error) => {
                setLoadingError('Ошибка загрузки ревьюверов');
        });
    };

    return (
        <div className={classes.ReviewFinder}>
            <button
                className="settingsButton"
                onClick={() => dispatch(toggleVisibility())}
            >{isVisible ? 'Скрыть' : 'Показать' } настройки</button>

            {isVisible ? <ReviewFinderSettings /> : null}

            <button className={classes.ReviewLoadButton} onClick={handleLoadReviewers} type='button'>Загрузить ревьюеров</button>

            {!loadingError ?
                <div>
                    <Select
                    isMulti
                    placeholder="Логины, которые не должны быть ревьюерами"
                    name="colors"
                    value={blackSelected}
                    options={blacklist}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => {

                        if (typeof e !== 'undefined') {
                            dispatch(setblackSelected(e));
                        } else {
                            dispatch(setblackSelected([]));
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
