import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./index.css";
import App from "./App";
import reducers from "./reducers";
import { intervals, notes } from "./config";
import * as serviceWorker from "./serviceWorker";

const store = createStore(reducers, getInitialState());

function getInitialState() {
	let notesMap = {};
	for (let i = 0; i < notes.length; i++) {
		let intervalMap = {};
		for (let i = 0; i < intervals.length; i++) {
			const interval = intervals[i];
			intervalMap[interval.size] = {
				name: interval.name,
				size: interval.size,
				probability: 0.5,
			};
		}
		const note = notes[i];
		notesMap[note.number] = {
			name: note.name,
			number: note.number,
			intervals: intervalMap,
		};
	}
	return {
		notes: notesMap,
		viewControls: false,
		time: {
			start: null,
			currentTime: null,
		},
		stats: {
			responseTime: null,
			sumResponseTime: 0,
			numResponses: 0,
			sampleMean: 5000,
			flashcardShownTime: null,
			testVariance: 0,
			sumTestVariance: 0,
			sampleVariance: 6250000,
			alpha: 4,
			beta: 0.0008,
		},
		history: { note: null, interval: null, probability: null },
	};
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
