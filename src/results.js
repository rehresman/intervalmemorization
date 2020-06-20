import React from "react";
import { connect } from "react-redux";
import { intervals, notes } from "./config";

class Results extends React.Component {
	constructor() {
		super();
		this.buildChart = this.buildChart.bind(this);
		this.getIntervalsForNote = this.getIntervalsForNote.bind(this);
		this.getNewRow = this.getNewRow.bind(this);
		this.getXAxis = this.getXAxis.bind(this);
		this.getIntervalNames = this.getIntervalNames.bind(this);
	}

	buildChart() {
		console.log(this.props.notes);
		let output = [];
		for (let i = 0; i < notes.length; i++) {
			output.push(this.getNewRow(this.props.notes[i]));
		}
		output.push(this.getXAxis());

		return output;
	}

	getIntervalsForNote(note) {
		let output = [];
		const notes = this.props.notes;
		const intervalArray = Object.entries(notes[note.number].intervals).map(
			(el) => el[1]
		);
		console.log();
		for (let i = 0, interval; i < intervalArray.length; i++) {
			interval = intervalArray[i];

			output.push(
				<div
					style={{
						backgroundColor: numberToColorHsl((1 - interval.probability) * 100),
					}}
					className="h-100 w-100 p-0 plot-blob"
				>
					~
				</div>
			);
		}
		return output;
	}

	getIntervalNames() {
		let output = [];
		for (let i = 0; i < intervals.length; i++) {
			output.push(
				<small>
					<b>{intervals[i].name}</b>
				</small>
			);
		}
		return output;
	}

	getNewRow(note) {
		return (
			<div className="d-flex justify-content-between">
				<b>{note.name}:</b> {this.getIntervalsForNote(note)}
			</div>
		);
	}

	getXAxis() {
		return (
			<div className="d-flex justify-content-between">
				<b className="hide">X :</b> {this.getIntervalNames()}
			</div>
		);
	}

	render() {
		return <div className="text-dark container">{this.buildChart()}</div>;
	}
}

function mapStateToProps({ notes }) {
	return { notes };
}

function hslToRgb(h, s, l) {
	var r, g, b;

	if (s === 0) {
		r = g = b = l; // achromatic
	} else {
		function hue2rgb(p, q, t) {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		}

		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
}

// convert a number to a color using hsl
function numberToColorHsl(i) {
	// as the function expects a value between 0 and 1, and red = 0° and green = 120°
	// we convert the input to the appropriate hue value
	var hue = (i * 1.2) / 360;
	// we convert hsl to rgb (saturation 100%, lightness 50%)
	var rgb = hslToRgb(hue, 1, 0.5);
	// we format to css value and return
	return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
}

export default connect(mapStateToProps)(Results);
