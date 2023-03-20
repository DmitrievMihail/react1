import { FC } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { State} from '../store/reducer';
import { setLogin, setRepo } from '../store/actions';
// eslint-disable-next-line
import classes from './../styles/ReviewFinderSettings.module.css';

const ReviewFinderSettings: FC = () => { // props: ReviewFinderSettingsType

    // type DispatchSettings = (arg: FetchUserDataFromGithub | AnyAction) => Promise<void>

    const dispatch = useDispatch();
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
