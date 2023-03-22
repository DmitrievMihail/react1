import { Action, ActionTypes } from "./reducer";
// import { Contributor } from "./reducer";

// export const setUserData = (value: Object): Action => ({type: ActionTypes.SET_USER_DATA, payload: value});
// export const setReviewer = (value: string): Action => ({type: ActionTypes.SET_REVIWER, payload: value});
export const setBlacklist = (value: Array<string>): Action => ({type: ActionTypes.SET_BLACKLIST, payload: value});
// export const setContributors = (value: Array<Contributor>): Action => ({type: 'SET_CONTRIBUTORS', payload: value});
export const setLogin = (value: string): Action => ({type: ActionTypes.SET_LOGIN, payload: value});
export const setRepo = (value: string): Action => ({type: ActionTypes.SET_REPO, payload: value});
export const toggleVisibility = (): Action => ({type: ActionTypes.TOGGLE_VISIBLE});
export const loadReviewers = (): Action => ({type: ActionTypes.LOAD_REVIEWERS});
export const setAppState = (value: any): Action => ({type: ActionTypes.SET_STATE, payload: value});
// export const setError = (value: string): Action => ({type: ActionTypes.SET_ERROR, payload: value});
