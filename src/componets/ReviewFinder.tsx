import {FC, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import { State} from '../store/reducer';
import { setBlack, setReviewers, toggleVisibility } from '../store/actions';
import ErrorMsg from './ErrorMsg';
import { DispatchSettings, reviewerType, reviewersDefault, showReviewerDefault} from './../types/ReviewFinder';
import ReviewFinderSettings from './ReviewFinderSettings';
import ReviewInfo from './ReviewInfo';
import fetchUserData from '../models/fetchUserData';
// eslint-disable-next-line
import classes from './../styles/ReviewFinder.module.css';

const ReviewFinder: FC = () => {

    const [showReviewer, setShowReviewer] = useState(showReviewerDefault);
    const isVisible = useSelector((state: State) => state.visible);
    const blacklist = useSelector((state: State) => state.blacklist);
    const reviewerList = useSelector((state: State) => state.reviewerList);

    const [loadingError, setLoadingError] = useState('');

    const getReviewer = () => {
        const filteredList = reviewerList.filter((reviewer: reviewerType) =>
            !blacklist.some((black: reviewerType) => black.value === reviewer.value)
        );
        if (!filteredList.length) {
            setShowReviewer(showReviewerDefault);
        } else {
            const reviewer = filteredList[Math.floor(Math.random() * (filteredList.length))];
            setShowReviewer({id: reviewer.value, login: reviewer.label, avatar: reviewer.avatar});
        }
    };

    const dispatch = useDispatch() as DispatchSettings;

    const handleLoadReviewers = () => {
        dispatch(setReviewers([reviewersDefault]));
        dispatch(setBlack([]));
        setShowReviewer(showReviewerDefault);
        setLoadingError('');
        dispatch(fetchUserData()).catch(() => {
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

            { !loadingError && reviewerList.length > 1 ?
                <div>
                    <Select
                    isMulti
                    placeholder="Логины, которые не должны быть ревьюерами"
                    name="colors"
                    value={blacklist}
                    options={reviewerList}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => {
                        dispatch(setBlack(typeof e !== 'undefined' ? e : [])); // Обрабатываем массив-логинов или пустой массив при отсутствии
                    }}
                    />

                    <button className={classes.ReviewFindButton} onClick={getReviewer}>Подобрать случайного ревьюера</button>

                    <ReviewInfo {...showReviewer} />
                </div>
            :
                <div>
                    {loadingError ?
                        <ErrorMsg msg={loadingError} />
                        :
                        <h3>Ревьюеры не загружены</h3>
                    }
                </div>
            }
        </div>
    );
};

export default ReviewFinder;
