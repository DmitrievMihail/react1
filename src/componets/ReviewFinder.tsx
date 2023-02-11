import React from 'react';
import classes from './../styles/ReviewFinder.module.css';

const ReviewFinder = (props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div {...props} className={classes.ReviewFinder}>
            <ul className={classes.ReviewFinderList}>
                <li>
                    Логин: <input placeholder='Логин текущего юзера' />
                </li>
                <li>
                    Репозиторий: <input placeholder='Репозиторий (для поиска ревьюера)' />
                </li>
                <li>
                    Чёрный список: <input placeholder='Логины, которые не должны быть ревьюерами' />
                </li>
            </ul>
            {props.children}
        </div>
    );
};

export default ReviewFinder;
