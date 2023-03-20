import { reviewBlackList, showReviewerDefault, showReviewerType, reviewerType, reviewerTypeLoad } from "../types/ReviewFinder";
/* eslint-disable */
export type State = {
    reviewer: string, // showReviewerType
    blacklist: reviewBlackList,
    reviewerList: Array<reviewerType>
    login: string,
    repo: string
}
/* eslint-enable */
export const initialState: State = {
    reviewer: '', // showReviewerDefault
    blacklist: [],
    reviewerList: [],
    login: '',
    repo: '',
};

/* eslint-disable */
export enum ActionTypes {
    SET_USER_DATA = 'SET_USER_DATA',
    SET_BLACKLIST = 'SET_BLACKLIST',
    SET_REVIEWERLIST = 'SET_REVIEWERLIST',
    SET_LOGIN = 'SET_LOGIN',
    SET_REPO = 'SET_REPO',
    SET_REVIWER = 'SET_REVIWER',
    SET_VISIBLE_SETTINGS = 'SET_VISIBLE_SETTINGS',
}

interface SetDataActions {
    type: ActionTypes.SET_USER_DATA;
	payload: string;
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

interface SetVisibleSettingsActions {
    type: ActionTypes.SET_VISIBLE_SETTINGS;
	payload: boolean;
}

const reducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_USER_DATA:
            return {
                ...state,
                userData: action.payload,
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
		case ActionTypes.SET_VISIBLE_SETTINGS:
			return {
				...state,
				visible: action.payload,
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

export type Action = SetDataActions | SetBlackListAction | SetReviewerListAction | SetLoginActions | SetRepoActions | SetRevierActions | SetVisibleSettingsActions;

export default reducer;
/* eslint-enable */
