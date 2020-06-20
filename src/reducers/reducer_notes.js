import { UPDATE_PROBABILITY } from "../actions/index";

export default function (state = null, action) {
	switch (action.type) {
		case UPDATE_PROBABILITY:
			return {
				...state,
				[action.payload.note.number]: {
					...state[action.payload.note.number],
					intervals: {
						...state[action.payload.note.number].intervals,
						[action.payload.interval.size]: {
							...action.payload.interval,
							probability: action.payload.probability,
						},
					},
				},
			};
		default:
			return { ...state };
	}
}
