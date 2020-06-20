import { combineReducers } from "redux";
import notesReducer from "./reducer_notes";
import viewControlsReducer from "./reducer_viewControls";
import timeReducer from "./reducer_time";
import historyReducer from "./reducer_history";
import statsReducer from "./reducer_stats";

const rootReducer = combineReducers({
	notes: notesReducer,
	viewControls: viewControlsReducer,
	time: timeReducer,
	stats: statsReducer,
	history: historyReducer,
});

export default rootReducer;
