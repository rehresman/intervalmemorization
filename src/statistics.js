export function getCurrentProbability(state) {
	return state.interval.probability;
}

export function getResponseTime(prevStats, time) {
	return time - prevStats.flashcardShownTime;
}

export function getSampleMean(prevStats, responseTime, increase = 1) {
	return (
		(responseTime + prevStats.sumResponseTime) /
		(prevStats.numResponses + increase)
	);
}

export function getResponseDeviation(prevStats, responseTime) {
	return Math.pow(responseTime - prevStats.sampleMean, 2);
}

export function getSampleVariance(prevStats, currentVariance) {
	const solution =
		prevStats.numResponses > 1
			? (prevStats.sumTestVariance + currentVariance) / prevStats.numResponses
			: 6250000;
	if (solution >= Number.MAX_VALUE) {
		alert("Variance overflow.  Need to fix this");
	}
	return solution;
}

export function getAlpha(sampleMean, sampleVariance) {
	return Math.pow(sampleMean, 2) / sampleVariance;
}

export function getBeta(sampleMean, sampleVariance) {
	return sampleMean / sampleVariance;
}
