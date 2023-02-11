import React, {useState} from 'react';
import classes from './../styles/ReviewFinder.module.css';

const ReviewFinder = (props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>) => {
    const [login, setLogin] = useState('123');
    const changeLogin = (login: string) => {
        setLogin(login);
    };

    return (
        <div {...props} className={classes.ReviewFinder}>
            <ul className={classes.ReviewFinderList}>
                <li>
                    Логин: <input placeholder='Логин текущего юзера' value={login} onChange={(e) => changeLogin(e.target.value)} />
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
