import { RootState } from "../store/store";
import { Dispatch } from "redux";
import { setBlack, setReviewers } from "../store/actions";
import loadJSON from "../loader";
import { AnyAction } from 'redux';
import { reviewerTypeLoad, reviewersDefault } from "../types/ReviewFinder";

/* eslint-disable */
export type FetchUserDataFromGithub = ( dispatch: Dispatch, getState: () => RootState ) => Promise<void>;
export type DispatchSettings = (arg: FetchUserDataFromGithub | AnyAction) => Promise<void>
export type FetchUserData = () => FetchUserDataFromGithub;
/* eslint-enable */

const fetchUserData: FetchUserData = () => {
    return (dispatch: Dispatch, getState: () => RootState) => {
        dispatch(setReviewers([reviewersDefault]));
        dispatch(setBlack([]));
        const url = `https://api.github.com/repos/${getState().login}/${getState().repo}/contributors`;
        const load = loadJSON(url).then((responce) => {
            // console.log('Загрузили список', responce);
            const reviewerList = responce.map((reviewer: reviewerTypeLoad) => {
                return {value: reviewer.id, label: reviewer.login, avatar: reviewer.avatar_url, isDisabled: false };
            });
            // reviewerList.length = 3;
            // console.log('Отформатили', reviewerList);
            dispatch(setReviewers(reviewerList));

        });
        // console.log(load);
        return load;

    };
};

export default fetchUserData;
