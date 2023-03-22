import { RootState } from "../store/store";
import { Dispatch } from "redux";
import { setReviewers } from "../store/actions";
import loadJSON from "../loader";
import { FetchUserData, reviewerTypeLoad } from "../types/ReviewFinder";

const fetchUserData: FetchUserData = () => {
    return (dispatch: Dispatch, getState: () => RootState) => {
        const url = `https://api.github.com/repos/${getState().login}/${getState().repo}/contributors`;
        const load = loadJSON(url).then((responce) => {
            // console.log('Загрузили список', responce);
            const reviewerList = responce.map((reviewer: reviewerTypeLoad) => {
                return {value: reviewer.id, label: reviewer.login, avatar: reviewer.avatar_url, isDisabled: false };
            });
            // reviewerList.length = 3; // Для отладки, чтобы всю толпу не грузить
            // console.log('Отформатили', reviewerList);
            dispatch(setReviewers(reviewerList));
        });
        // console.log(load);
        return load;

    };
};

export default fetchUserData;
