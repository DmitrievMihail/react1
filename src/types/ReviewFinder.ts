import { MultiValue } from 'react-select';

/* eslint-disable */

export type reviewerType = {'value': number; 'label': string; 'avatar': string; 'isDisabled'?: boolean};
export type reviewerTypeLoad = {'id': number; 'avatar_url': string; 'login': string; type: string};
export type reviewBlackList = MultiValue<reviewerType>;

export type showReviewerType = {'id': number, login: string, avatar: string};

export const showReviewerDefault: showReviewerType = {id: 0, login: '', avatar: ''};

export type ReviewFinderSettingsType = {
    login: string,
    setLogin: Function,
    repo: string,
    setRepo: Function 
}

export type searchListType = { login: string, avatar_url: string, html_url: string };

/* eslint-disable */
export interface GroupBase<Option> {
    readonly options: readonly Option[];
    readonly label?: string;
}
/* eslint-enable */

