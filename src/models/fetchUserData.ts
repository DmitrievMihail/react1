import { request } from "../hooks/http.hook";
import { RootState } from "../store/store";
import { Dispatch } from "redux";
import { setLogin, setRepo } from "../store/actions"; // setUserData, setContributors
import loadJSON from "../loader";
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from "react-redux";
import { State} from '../store/reducer';
import { reviewerTypeLoad } from "../types/ReviewFinder";

/* eslint-disable */
export type FetchUserDataFromGithub = ( dispatch: Dispatch, getState: () => RootState ) => Promise<void>;
export type DispatchSettings = (arg: FetchUserDataFromGithub | AnyAction) => Promise<void>
export type FetchUserData = () => FetchUserDataFromGithub;
/* eslint-enable */

const fetchUserData: FetchUserData = () => {
    return (dispatch: Dispatch, getState: () => RootState) => {
        const url = `https://api.github.com/repos/${getState().login}/${getState().repo}/contributors`;
        console.log(url);
        const load = loadJSON(url).then((responce) => {
            console.log(responce);
        });
        console.log(load);
        return load;

    };
};

/*
const fetchUserData: FetchUserData = () => {
    console.log(1);
    const fetchUserData2 = async (dispatch: Dispatch, getState: () => RootState) => {
        console.log(2.5);
        console.log(getState().login);
        const url = `https://api.github.com/repos/${getState().login}/${getState().repo}/contributors`;
        console.log(url);
        const load = await loadJSON(url);
        console.log(load);
        return load;
        // return loadJSON(`https://api.github.com/repos/${login}/${repo}/contributors`)
        //     .then((res) => {
        //         // dispatch(setUserData(res.data));
        //         request(res.data.contributors_url)
        //             .then((response) => {
        //                 // dispatch(setContributors(response.filter(item => item.login !== login)));
        //             }).catch((e) => {
        //                 throw new Error(`Ошибка загрузки ревьюеров: ${e}`);
        //             });
        //     }).catch((e) => {
        //         throw new Error(`Ошибка загрузки ревьюеров: ${e}`);
        //     });
    };
    return fetchUserData2;
};

/*
const fetchUserData = () => {
    console.log(123);
    const fetchUserData3 = async (dispatch: Dispatch, getState: () => RootState) => {
        const login = useSelector((state: State) => state.login);
        const repo = useSelector((state: State) => state.repo);
        console.log('Грузим список ревьюеров: ', login, repo);
        return;
        try {
            const reviewersData = await loadJSON(`https://api.github.com/repos/${login}/${repo}/contributors`);
            // console.log(reviewersData);
            const reviewerList = reviewersData.map((reviewer: reviewerTypeLoad) => {
                return {value: reviewer.id, label: reviewer.login, avatar: reviewer.avatar_url, isDisabled: false };
            });
            console.log('Загружено', reviewerList.length);
            // reviewerList.length = 2;
            // setBlack(reviewerList);
            // console.log(reviewerList);
            // setLoadingError('');
            return reviewerList;
        } catch (err) {
            // console.log(err);
            throw new Error(`Ошибка загрузки ревьюеров: ${err}`);
            // return 'Ошибка загрузки ревьюеров';
        }
    };
    return fetchUserData3;
};

/*
const loadReviewers = async () => {
    // console.log('Грузим список ревьюеров');
    setShowReviewer(showReviewerDefault);
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
*/

export default fetchUserData;
function e(reason: any): PromiseLike<never> {
    throw new Error("Function not implemented.");
}

