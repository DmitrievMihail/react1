import {FC, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { State} from '../store/reducer';
import { setBlack, toggleVisibility } from '../store/actions';
import Select from 'react-select';
import ErrorMsg from './ErrorMsg';
import { showReviewerDefault} from './../types/ReviewFinder';
import ReviewFinderSettings from './ReviewFinderSettings';
// eslint-disable-next-line
import classes from './../styles/ReviewFinder.module.css';
import ReviewInfo from './ReviewInfo';
import fetchUserData, { DispatchSettings } from '../models/fetchUserData';

const ReviewFinder: FC = () => {

    const [showReviewer, setShowReviewer] = useState(showReviewerDefault);
    const isVisible = useSelector((state: State) => state.visible);
    const blacklist = useSelector((state: State) => state.blacklist);
    const reviewerList = useSelector((state: State) => state.reviewerList);

    const [loadingError, setLoadingError] = useState('');

    const getReviewer = () => {
        console.log('Подбираем ревьюера из списка');
        console.log(blacklist);
        console.log(reviewerList);
        /*
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
                        <h3>Логины не загружены</h3>
                    }
                </div>
            }
        </div>
    );
};

export default ReviewFinder;
