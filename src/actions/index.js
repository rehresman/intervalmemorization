export const UPDATE_INTERVAL_LIST = "UPDATE_INTERVAL_LIST";
export const UPDATE_NOTE_LIST = "UPDATE_NOTE_LIST";
export const TOGGLE_CONTROLS = "TOGGLE_CONTROLS";
export const UPDATE_PROBABILITY = "UPDATE_PROBABILITY";
export const UPDATE_TIME = "UPDATE_TIME";
export const SAVE_PREVIOUS_PROBABILITY = "SAVE_PREVIOUS_PROBABILITY";
export const UPDATE_STATS = "UPDATE_STATS";
export const START_TIME = "START_TIME";
export const UPDATE_FLASHCARD_SHOWN_TIME = "UPDATE_FLASHCARD_SHOWN_TIME";
export const ANSWER_RECEIVED = "ANSWER_RECEIVED";

export function answerReceived(time) {
	return {
		type: ANSWER_RECEIVED,
		payload: time,
	};
}

export function startTime(time) {
	return { type: START_TIME, payload: time };
}

export function toggleControls() {
	return {
		type: TOGGLE_CONTROLS,
	};
}

export function updateStats(time, numResponses = 1) {
	console.log("here: ", { time, numResponses });
	return {
		type: UPDATE_STATS,
		payload: { time, numResponses },
	};
}

export function updateTime(time) {
	return {
		type: UPDATE_TIME,
		payload: time,
	};
}

export function updateFlashcardShownTime(time) {
	return {
		type: UPDATE_FLASHCARD_SHOWN_TIME,
		payload: time,
	};
}

export function updateProbability(note, interval, probability) {
	return {
		type: UPDATE_PROBABILITY,
		payload: { note, interval, probability },
	};
}

//take the probability
export function savePreviousProbability(note, interval, probability) {
	return {
		type: SAVE_PREVIOUS_PROBABILITY,
		payload: { note, interval, probability },
	};
}
