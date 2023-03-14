import { MultiValue } from 'react-select';

export type reviewerType = { 'value': number; 'label': string; 'avatar': string; 'isDisabled'?: boolean};
export type reviewerTypeLoad = { 'id': number; 'avatar_url': string; 'login': string; type: string};
export type ReviewBlackList = MultiValue<reviewerType>;
