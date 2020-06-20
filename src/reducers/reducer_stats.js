import { UPDATE_STATS, UPDATE_FLASHCARD_SHOWN_TIME } from "../actions/index";
import {
	getResponseTime,
	getSampleMean,
	getSampleVariance,
	getResponseDeviation,
	getAlpha,
	getBeta,
} from "../statistics.js";

export default function (state = null, action) {
	switch (action.type) {
		case UPDATE_FLASHCARD_SHOWN_TIME:
			return {
				...state,
				flashcardShownTime: action.payload,
			};
		case UPDATE_STATS:
			const responseTime = getResponseTime(state, action.payload.time);
			const sampleMean = getSampleMean(state, responseTime);
			const responseDeviation = getResponseDeviation(state, responseTime);
			const sampleVariance = getSampleVariance(state, responseDeviation);
			return {
				...state,
				start: state.start,
				responseTime,
				sumResponseTime: responseTime + state.sumResponseTime,
				numResponses: state.numResponses + action.payload.numResponses,
				sampleMean,
				responseDeviation,
				sumTestVariance: state.sumTestVariance + responseDeviation,
				sampleVariance,
				alpha: getAlpha(sampleMean, sampleVariance),
				beta: getBeta(sampleMean, sampleVariance),
			};
		default:
			return { ...state };
	}
}
