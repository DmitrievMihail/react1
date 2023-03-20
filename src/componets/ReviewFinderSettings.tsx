import { FC } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { State} from '../store/reducer';
import { setLogin, setRepo } from '../store/actions';
// eslint-disable-next-line
import classes from './../styles/ReviewFinderSettings.module.css';
import { DispatchSettings } from '../models/fetchUserData';

const ReviewFinderSettings: FC = () => {

    const dispatch = useDispatch() as DispatchSettings;
    const login = useSelector((state: State) => state.login);
    const repo = useSelector((state: State) => state.repo);

    return (
        <ul className={classes.ReviewFinderList}>
            <li>
                Логин: <input
                    type='text'
                    placeholder='использовал twbs'
                    value={login}
                    onChange={(e) => dispatch(setLogin(e.target.value))}
                />
            </li>
            <li>
                Репозиторий: <input
                    type='text'
                    placeholder='использовал bootstrap'
                    value={repo}
                    onChange={(e) => dispatch(setRepo(e.target.value))}
                />
            </li>
        </ul>
    );
};

export default ReviewFinderSettings;
