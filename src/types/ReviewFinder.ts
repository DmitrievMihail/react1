import { MultiValue } from 'react-select';

/* eslint-disable */

export type reviewerType = {'value': number; 'label': string; 'avatar': string; 'isDisabled'?: boolean};
export type reviewerTypeLoad = {'id': number; 'avatar_url': string; 'login': string; type: string};
export type reviewBlackList = MultiValue<reviewerType>;

export type showReviewerType = {'id': number, login: string, avatar: string};

export const showReviewerDefault: showReviewerType = {id: 0, login: '', avatar: ''};
export const reviewersDefault: reviewerType ={'value': 0, 'label': 'Логины не загружены', 'avatar': '', 'isDisabled': true}


