import React, {useState} from 'react';
//  import useLocalStorage from './../storage';
// eslint-disable-next-line
import classes from './../styles/ReviewFinderSettings.module.css';

const ReviewFinderSettings = (props: {login: string, setLogin: Function, repo: string, setRepo: Function}) => {
    return (
        <ul className={classes.ReviewFinderList}>
            <li>
                Логин: <input
                    type='text'
                    placeholder='использовал twbs'
                    value={props.login}
                    onChange={(e) => props.setLogin(e.target.value)}
                />
            </li>
            <li>
                Репозиторий: <input
                    type='text'
                    placeholder='использовал bootstrap'
                    value={props.repo}
                    onChange={(e) => props.setRepo(e.target.value)}
                />
            </li>
        </ul>
    );
};

export default ReviewFinderSettings;
