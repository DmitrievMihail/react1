// import { fetchReviewers } from "../models/fetchUserData";
import { reviewBlackList, showReviewerDefault, showReviewerType, reviewerType, reviewerTypeLoad } from "../types/ReviewFinder";
/* eslint-disable */
export type State = {
    reviewer: string, // showReviewerType
    blacklist: reviewBlackList,
    reviewerList: Array<reviewerType>,
    login: string,
    repo: string,
    visible: boolean,
    error: string,
}
/* eslint-enable */
export const initialState: State = {
    reviewer: '', // showReviewerDefault
    blacklist: [],
    reviewerList: [],
    login: '',
    repo: '',
    visible: false,
    error: '',
};

/* eslint-disable */
export enum ActionTypes {
    SET_STATE = 'SET_STATE',
    SET_BLACKLIST = 'SET_BLACKLIST',
    SET_REVIEWERLIST = 'SET_REVIEWERLIST',
    SET_LOGIN = 'SET_LOGIN',
    SET_REPO = 'SET_REPO',
    SET_REVIWER = 'SET_REVIWER',
    TOGGLE_VISIBLE = 'TOGGLE_VISIBLE',
    LOAD_REVIEWERS = 'LOAD_REVIEWERS',
    SET_ERROR = 'SET_ERROR',
}

interface SetStateAction {
    type: ActionTypes.SET_STATE;
	payload: any[];
}

interface SetBlackListAction {
    type: ActionTypes.SET_BLACKLIST;
	payload: any[];
}

interface SetReviewerListAction {
    type: ActionTypes.SET_REVIEWERLIST;
    payload: any[];
}

interface SetLoginActions {
    type: ActionTypes.SET_LOGIN;
	payload: string;
}

interface SetRepoActions {
    type: ActionTypes.SET_REPO;
	payload: string;
}

interface SetRevierActions {
    type: ActionTypes.SET_REVIWER;
	payload: string;
}
interface ToggleVisibleActions {
    type: ActionTypes.TOGGLE_VISIBLE;
}

interface LoadReviewersActions {
    type: ActionTypes.LOAD_REVIEWERS;
}
interface SetErrorActions {
    type: ActionTypes.SET_ERROR;
    payload: string;
}

const reducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_STATE:
            return {
                ...state,
                ...action.payload,
            };
        case ActionTypes.SET_BLACKLIST:
            return {
                ...state,
                blacklist: action.payload,
            };
        case ActionTypes.SET_REVIEWERLIST:
            return {
                ...state,
                reviewerList: action.payload,
			};
		case ActionTypes.SET_LOGIN:
			return {
				...state,
				login: action.payload,
			};
		case ActionTypes.SET_REPO:
			return {
				...state,
				repo: action.payload,
			};
		case ActionTypes.SET_REVIWER:
			return {
				...state,
				reviewer: action.payload,
			};
		case ActionTypes.TOGGLE_VISIBLE:
			return {
				...state,
				visible: !state.visible,
			};
        // case ActionTypes.LOAD_REVIEWERS:
        //     fetchReviewers(); // .then((response) => {})
            
        //     return state; // Ничего не возвращаем, асинхронная функция
        case ActionTypes.SET_ERROR:
            console.log('***', action.payload);
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}


export type ReviewerData = {
    login: string,
    avatar_url: string,
    html_url: string
}

export type Action = SetStateAction | SetBlackListAction | SetReviewerListAction | SetLoginActions | SetRepoActions | SetRevierActions | ToggleVisibleActions | LoadReviewersActions | SetErrorActions;

export default reducer;
/* eslint-enable */
