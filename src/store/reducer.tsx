import { reviewBlackList, showReviewerDefault, showReviewerType, reviewerType, reviewerTypeLoad } from "../types/ReviewFinder";
/* eslint-disable */
export type State = {
    reviewer: string, // showReviewerType
    blacklist: reviewBlackList,
    reviewerList: Array<reviewerType>,
    login: string,
    repo: string,
    visible: boolean,
}
/* eslint-enable */
export const initialState: State = {
    reviewer: '', // showReviewerDefault
    blacklist: [],
    reviewerList: [],
    login: '',
    repo: '',
    visible: false,
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
        default:
            return state;
    }
}


export type ReviewerData = {
    login: string,
    avatar_url: string,
    html_url: string
}

export type Action = SetStateAction | SetBlackListAction | SetReviewerListAction | SetLoginActions | SetRepoActions | SetRevierActions | ToggleVisibleActions;

export default reducer;
/* eslint-enable */
