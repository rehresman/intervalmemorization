import { UPDATE_TIME, START_TIME } from "../actions/index";

export default function (state = null, action) {
	switch (action.type) {
		case START_TIME:
			return {
				...state,
				start: action.payload,
			};

		case UPDATE_TIME:
			return {
				...state,
				currentTime: action.payload,
			};

		default:
			return { ...state };
	}
}
