import React from "react";
import { connect } from "react-redux";
import { startTime, updateTime } from "./actions/index";

class Stopwatch extends React.Component {
	constructor() {
		super();
		this.state = {
			interval: null,
			color: "#fff",
		};
		this.changeColor = this.changeColor.bind(this);
	}

	changeColor() {
		let r = Math.floor(Math.random() * 6);
		let color;
		if (r === this.state.color) {
			r = (r + 1) % 6;
		}
		console.log("r=", r);
		switch (r) {
			case 0:
				color = "#007bff";
				break;
			case 1:
				color = "#28a745";
				break;
			case 2:
				color = "#dc3545";
				break;
			case 3:
				color = "#ffc107";
				break;
			case 4:
				color = "#17A2BD";
				break;
			case 5:
			default:
				color = "#fff";
		}
		this.setState({ color });
	}

	componentDidMount() {
		//TODO: make this tick every 100ms
		//TODO: This won't work if the session goes through midnight
		this.setState({
			interval: setInterval(
				() => this.props.dispatch(updateTime(new Date().getTime())),
				100
			),
		});
		this.props.dispatch(startTime(new Date().getTime()));
	}

	componentDidUpdate(prevProps, prevState) {
		const currentValue = Math.round(
			(this.props.time.currentTime - this.props.time.start) / 1000
		);
		const prevValue = Math.round(
			(prevProps.time.currentTime - prevProps.time.start) / 1000
		);
		if (Math.floor(currentValue / 60) !== Math.floor(prevValue / 60)) {
			this.changeColor();
		}
	}

	componentWillUnmount() {
		clearInterval(this.state.interval);
		//TODO: Clear redux store data too on unmount
	}

	render() {
		const value = Math.round(
			(this.props.time.currentTime - this.props.time.start) / 1000
		);
		const seconds = value % 60;
		const minutes = Math.floor(value / 60);
		const zero = seconds < 10 ? 0 : "";
		return (
			<time id="timer" className="border py-3">
				<code style={{ color: this.state.color }}>
					{minutes}:{zero}
					{seconds}
				</code>
			</time>
		);
	}
}

function mapStateToProps({ notes, viewControls, time }) {
	return { notes, viewControls, time };
}

export default connect(mapStateToProps)(Stopwatch);
