import React from "react";
import { connect } from "react-redux";
import {
	updateFlashcardShownTime,
	updateStats,
	updateProbability,
	savePreviousProbability,
} from "./actions/index";
import { getResponseTime } from "./statistics.js";
import { jStat } from "jstat";

class Flashcard extends React.Component {
	constructor() {
		super();
		this.state = {
			note: null,
			interval: null,
			answer: null,
			showAnswer: false,
		};
		this.chooseNext = this.chooseNext.bind(this);
		this.getNewProbability = this.getNewProbability.bind(this);
		this.getRandomNote = this.getRandomNote.bind(this);
		this.getRandomInterval = this.getRandomInterval.bind(this);
		this.getAnswer = this.getAnswer.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	chooseNext() {
		const n = Math.floor(Math.random() * 12);
		const i = Math.floor(Math.random() * 11) + 1;
		const selection = this.props.notes[n].intervals[i];
		if (Math.random() > selection.probability) {
			return this.chooseNext();
		} else {
			return {
				note: this.props.notes[n],
				interval: this.props.notes[n].intervals[i],
			};
		}
	}

	componentDidMount() {
		this.setState(this.chooseNext());
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			prevState.note !== this.state.note ||
			prevState.interval !== this.state.interval
		) {
			this.setState(this.getAnswer);
		}
		if (this.state.note !== prevState.note) {
			console.log(this.props);
		}
	}

	getNewProbability(prevStats, time) {
		const responseTime = getResponseTime(prevStats, time);
		const responseScore = jStat.gamma.cdf(
			responseTime,
			prevStats.alpha,
			1 / prevStats.beta
		);
		const p = this.state.interval.probability;

		//p=.7
		//rS = .6
		//output = .7 - .3 *(rS - .5)
		// output should be .7 if rS = .5
		//output should be greater than .7 if rS < .5
		//output should be less than .7 if rS > .5
		/*
				ex.
				.7 - .3 * (.6 - .5) = .7 - .03 = .67.  A slight decrease in probability 
				to be shown again.
				
				p=.5
				rS = .5
				.5 - .5 *(.5-.5) = .5

				p = .4
				rS = .8
				.4 - .6(.8 - .5) = .22

				p = .4
				rS = .3
				.4 - .6(.3 - .5) = .52

		*/

		return p + (1 - p) * (responseScore - 0.5);
	}

	getRandomNote() {
		return this.props.notes[0];
	}

	getRandomInterval() {
		return this.props.notes[0].intervals[1];
	}

	getAnswer(state) {
		const number =
			(state.note.number + state.interval.size) %
			Object.entries(this.props.notes).length;
		let answer = { ...this.props.notes[number] };
		return { ...state, answer };
	}

	handleClick() {
		const time = new Date().getTime();
		if (this.state.showAnswer) {
			this.props.dispatch(updateFlashcardShownTime(time));
			this.setState({
				...this.chooseNext(),
				showAnswer: false,
			});
		} else {
			if (this.props.stats.flashcardShownTime) {
				const probability = this.getNewProbability(this.props.stats, time);
				this.props.dispatch(
					savePreviousProbability(
						this.state.note,
						this.state.interval,
						this.state.interval.probability
					)
				);
				this.props.dispatch(updateStats(time));
				this.props.dispatch(
					updateProbability(this.state.note, this.state.interval, probability)
				);
			}
			this.setState({ showAnswer: true });
		}
	}

	render() {
		const noteDetails = this.state.note ? this.state.note.name : null;
		const intervalDetails = this.state.interval
			? this.state.interval.name
			: null;
		const answerDetails = this.state.answer ? this.state.answer.name : null;
		let answerClasses = "answer hide";
		let flashcardClasses = "border";
		let intervalClasses = "interval lightgray";
		if (this.state.showAnswer) {
			answerClasses = "answer show";
			flashcardClasses = "border bg-white text-dark";
			intervalClasses = "interval darkgray";
		}
		if (this.props.viewControls) {
			flashcardClasses += " hide";
		}
		return (
			<div
				id="flashcard"
				className={flashcardClasses}
				onClick={this.handleClick}
			>
				<section className="note">{noteDetails}</section>
				<section className={intervalClasses}>{intervalDetails}</section>
				<section className={answerClasses}>{answerDetails}</section>
			</div>
		);
	}
}

function mapStateToProps({ notes, viewControls, stats, history }) {
	return { notes, viewControls, stats, history };
}

export default connect(mapStateToProps)(Flashcard);
