import React from "react";
import { connect } from "react-redux";
import { updateProbability } from "./actions/index";
import Results from "./results";

class Controls extends React.Component {
	constructor() {
		super();
		this.getIntervals = this.getIntervals.bind(this);
		this.expandedView = this.expandedView.bind(this);
		this.getNotes = this.getNotes.bind(this);
		this.updateIntervalList = this.updateIntervalList.bind(this);
		this.updateNoteList = this.updateNoteList.bind(this);
		this.isActiveInterval = this.isActiveInterval.bind(this);
		this.isActiveNote = this.isActiveNote.bind(this);
		this.state = {
			show: false,
		};
	}

	componentDidMount() {
		setTimeout(() => this.setState({ show: true }), 0);
	}

	expandedView() {
		return (
			<div className="position-relative">
				<small className="expanded border" onClick={this.toggleView}>
					Hide Controls
				</small>
				<ul className="mt-3">{this.getIntervals()}</ul>
			</div>
		);
	}

	getIntervals() {
		let output = [];
		const notes = this.props.notes;
		const intervalArray = Object.entries(notes[0].intervals).map((el) => el[1]);
		for (let i = 0, interval; i < intervalArray.length; i++) {
			interval = intervalArray[i];
			const { name } = interval;
			const active = this.isActiveInterval(interval, notes);
			output.push(
				<li key={name}>
					<input
						type="checkbox"
						defaultChecked={active}
						value={name}
						onClick={() => this.handleIntervalClick(interval)}
					/>
					<label htmlFor={name} className="pl-1">
						{name}
					</label>
				</li>
			);
		}
		return output;
	}

	getNotes() {
		let output = [];
		const noteArray = Object.entries(this.props.notes).map((el) => el[1]);
		for (let i = 0, note; i < noteArray.length; i++) {
			note = noteArray[i];
			const { name } = note;
			const active = this.isActiveNote(note);
			output.push(
				<li key={name}>
					<input
						type="checkbox"
						defaultChecked={active}
						value={name}
						onClick={() => this.handleNoteClick(note)}
					/>
					<label htmlFor={name} className="pl-1">
						{name}
					</label>
				</li>
			);
		}
		return output;
	}

	handleIntervalClick(interval) {
		this.updateIntervalList(interval);
	}

	handleNoteClick(note) {
		this.updateNoteList(note);
	}

	isActiveInterval(interval, notes) {
		const intervalArray = Object.entries(notes).map(
			(el) => el[1].intervals[interval.size]
		);

		for (let i = 0; i < intervalArray.length; i++) {
			if (intervalArray[i].probability > 0) {
				return true;
			}
		}
		return false;
	}

	isActiveNote(note) {
		const intervalArray = Object.entries(note.intervals).map((el) => el[1]);
		for (let i = 0; i < intervalArray.length; i++) {
			if (intervalArray[i].probability > 0) {
				return true;
			}
		}
		return false;
	}

	render() {
		let classes;
		if (this.state.show) {
			classes = "bg-light text-dark";
		} else {
			classes = "container";
		}
		return (
			<div className="controls-view">
				<section id="controls" className={classes}>
					<div className="container">
						<div className="row">
							<div className="col-6">
								<b className="">Intervals</b>
								<ul className="mt-3">{this.getIntervals()}</ul>
							</div>
							<div className="col-6">
								<b className="">Notes</b>
								<ul className="mt-3">{this.getNotes()}</ul>
							</div>
						</div>
					</div>
				</section>
				<Results />
			</div>
		);
	}

	updateIntervalList(interval) {
		const notes = this.props.notes;
		const notesArr = Object.entries(notes).map((el) => el[1]);
		const p = this.isActiveInterval(interval, notes) ? 0 : 0.5;
		for (let i = 0; i < notesArr.length; i++) {
			if (this.isActiveNote(notesArr[i])) {
				this.props.dispatch(updateProbability(notesArr[i], interval, p));
			}
		}
	}

	updateNoteList(note) {
		const intervalArr = Object.entries(note.intervals).map((el) => el[1]);
		const p = this.isActiveNote(note) ? 0 : 0.5;
		for (let i = 0; i < intervalArr.length; i++) {
			if (this.isActiveInterval(intervalArr[i], this.props.notes)) {
				this.props.dispatch(updateProbability(note, intervalArr[i], p));
			}
		}
	}
}

function mapStateToProps({ notes, viewControls }) {
	return { notes, viewControls };
}

export default connect(mapStateToProps)(Controls);
