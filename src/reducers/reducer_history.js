import { SAVE_PREVIOUS_PROBABILITY } from "../actions/index";

export default function (state = null, action) {
	switch (action.type) {
		case SAVE_PREVIOUS_PROBABILITY:
			return { ...action.payload };
		default:
			return { ...state };
	}
}
