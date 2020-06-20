import { TOGGLE_CONTROLS } from "../actions/index";

export default function (state = null, action) {
	switch (action.type) {
		case TOGGLE_CONTROLS:
			return !state;
		default:
			return state;
	}
}
