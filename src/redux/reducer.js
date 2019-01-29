import loadChampionsQuery from '../queries/loadChampions';
import loadYearWinnersQuery from '../queries/loadYearWinners';

const LOAD_CHAMPIONS_START = 'LOAD_CHAMPIONS_START';
const LOAD_CHAMPIONS_SUCCESS = 'LOAD_CHAMPIONS_SUCCESS';
const LOAD_CHAMPIONS_FAILURE = 'LOAD_CHAMPIONS_FAILURE';

const LOAD_ROUND_WINNERS_START = 'LOAD_ROUND_WINNERS_START';
const LOAD_ROUND_WINNERS_SUCCESS = 'LOAD_ROUND_WINNERS_SUCCESS';
const LOAD_ROUND_WINNERS_FAILURE = 'LOAD_ROUND_WINNERS_FAILURE';

export const loadChampions = (startingYear = 2005, amountOfYears = 11) => async dispatch => {
	dispatch({ type: LOAD_CHAMPIONS_START });
	try {
		const champions = await loadChampionsQuery(startingYear, amountOfYears);
		dispatch({
			type: LOAD_CHAMPIONS_SUCCESS,
			payload: champions,
		});
	} catch (error) {
		dispatch({
			type: LOAD_CHAMPIONS_FAILURE,
			payload: error,
		});
	}
};

export const loadYearWinners = year => async dispatch => {
	dispatch({ type: LOAD_ROUND_WINNERS_START });
	try {
		const yearWinners = await loadYearWinnersQuery(year);
		dispatch({
			type: LOAD_ROUND_WINNERS_SUCCESS,
			payload: {
				year,
				yearWinners,
			},
		});
	} catch (error) {
		dispatch({
			type: LOAD_ROUND_WINNERS_FAILURE,
			payload: error,
		});
	}
};

const initialState = {
	loadingChampions: false,
	champions: [],
	loadingYearWinners: false,
	yearWinners: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LOAD_CHAMPIONS_START:
			return { ...state, loadingChampions: true };
		case LOAD_CHAMPIONS_SUCCESS:
			return { ...state, loadingChampions: false, champions: action.payload };
		case LOAD_CHAMPIONS_FAILURE:
			return { ...state, loadingChampions: false };
		case LOAD_ROUND_WINNERS_START:
			return { ...state, loadingYearWinners: true };
		case LOAD_ROUND_WINNERS_SUCCESS:
			return {
				...state,
				loadingYearWinners: false,
				yearWinners: {
					...state.yearWinners,
					[action.payload.year]: action.payload.yearWinners
				},
			};
		case LOAD_ROUND_WINNERS_FAILURE:
			return { ...state, loadingYearWinners: false };
		default:
			return state;
	}
};
