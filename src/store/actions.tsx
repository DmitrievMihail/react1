import { reviewBlackList } from "../types/ReviewFinder";
import { Action, ActionTypes } from "./reducer";

export const setReviewers = (value: reviewBlackList): Action => ({type: ActionTypes.SET_REVIEWERS, payload: value});
export const setBlack = (value: reviewBlackList): Action => ({type: ActionTypes.SET_BLACKLIST, payload: value});
export const setLogin = (value: string): Action => ({type: ActionTypes.SET_LOGIN, payload: value});
export const setRepo = (value: string): Action => ({type: ActionTypes.SET_REPO, payload: value});
export const toggleVisibility = (): Action => ({type: ActionTypes.TOGGLE_VISIBLE});
export const setAppState = (value: any): Action => ({type: ActionTypes.SET_STATE, payload: value});
