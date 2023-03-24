import { reviewBlackList } from "../types/ReviewFinder";
/* eslint-disable */
export type State = {
    blacklist: reviewBlackList,
    reviewerList: reviewBlackList,
    login: string,
    repo: string,
    visible: boolean,
    error: string,
}
/* eslint-enable */
export const initialState: State = {
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
    SET_LOGIN = 'SET_LOGIN',
    SET_REPO = 'SET_REPO',
    TOGGLE_VISIBLE = 'TOGGLE_VISIBLE',
    SET_REVIEWERS = 'SET_REVIEWERS',
    SET_ERROR = 'SET_ERROR',
}

interface SetStateAction {
    type: ActionTypes.SET_STATE;
	payload: any[];
}

interface SetBlackListAction {
    type: ActionTypes.SET_BLACKLIST;
	payload: reviewBlackList;
}

interface SetReviewersAction {
    type: ActionTypes.SET_REVIEWERS;
	payload: reviewBlackList;
}

interface SetLoginActions {
    type: ActionTypes.SET_LOGIN;
	payload: string;
}

interface SetRepoActions {
    type: ActionTypes.SET_REPO;
	payload: string;
}

interface ToggleVisibleActions {
    type: ActionTypes.TOGGLE_VISIBLE;
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
        case ActionTypes.SET_REVIEWERS:
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
		case ActionTypes.TOGGLE_VISIBLE:
			return {
				...state,
				visible: !state.visible,
			};
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

export type Action = SetStateAction
    | SetBlackListAction
    | SetReviewersAction
    | SetLoginActions
    | SetRepoActions
    | ToggleVisibleActions
    | SetErrorActions

export default reducer;
