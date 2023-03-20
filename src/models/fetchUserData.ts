import { request } from "../hooks/http.hook";
import { RootState } from "../store/store";
import { Dispatch } from "redux";
import { setLogin, setRepo } from "../store/actions"; // setUserData, setContributors
import loadJSON from "../loader";

export type FetchUserDataFromGithub = (
	dispatch: Dispatch,
	getState: () => RootState
) => Promise<void>;

export type FetchUserData = (login: string, repo: string) => FetchUserDataFromGithub;

const fetchUserData: FetchUserData = (login: string, repo: string) => {
	const fetchUserData = async (dispatch: Dispatch, getState: () => RootState) => {
		return await loadJSON(`https://api.github.com/repos/${login}/${repo}/contributors`)
			.then((res) => {
				//dispatch(setUserData(res.data));
				request(res.data.contributors_url)
					.then((response) => {
						//dispatch(setContributors(response.filter(item => item.login !== login)));
					}).catch((e) => {
						throw new Error(`Ошибка загрузки ревьюеров: ${e}`)
					})
			}).catch((e) => {
				throw new Error(`Ошибка загрузки ревьюеров: ${e}`)
			})
	};
	return fetchUserData;
};

export default fetchUserData;

/*
const loadReviewers = async () => {
	// console.log('Грузим список ревьюеров');
	setShowReviewer(showReviewerDefault);
	setBlack([]);
	setblackSelected([]);
	try {
		const reviewersData = await loadJSON(`https://api.github.com/repos/${login}/${repo}/contributors`);
		// console.log(reviewersData);
		reviewerList = reviewersData.map((reviewer: reviewerTypeLoad) => {
			return {value: reviewer.id, label: reviewer.login, avatar: reviewer.avatar_url, isDisabled: false };
		});
		// reviewerList.length = 2;
		setBlack(reviewerList);
		// console.log(reviewerList);
		setLoadingError('');
	} catch (err) {
		console.log(err);
		setLoadingError('Ошибка загрузки ревьюеров');
	}
};
*/