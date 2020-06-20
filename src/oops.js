import React from "react";
import { connect } from "react-redux";
import { updateProbability } from "./actions/index";
import "./App.css";

class Oops extends React.Component {
	constructor() {
		super();

		this.state = {
			oops: false,
		};
		this.handleOopsClick = this.handleOopsClick.bind(this);
	}

	handleOopsClick() {
		this.setState({ oops: true });
		if (this.props.history.note) {
			const probability =
				this.props.history.probability +
				(1 - this.props.history.probability) / 2;
			this.props.dispatch(
				updateProbability(
					this.props.history.note,
					this.props.history.interval,
					probability
				)
			);
		}
	}

	componentDidUpdate(prevProps) {
		if (
			prevProps.history.note !== this.props.history.note ||
			prevProps.history.interval !== this.props.history.interval ||
			prevProps.history.probability !== this.props.history.probability
		) {
			this.setState({ oops: false });
		}
	}

	render() {
		let oopsClasses = !this.state.oops
			? "border p-3 py-4 mr-4 mr-md-5 smooth ml-0"
			: "border tiny smooth";
		let text = this.state.oops ? "" : "Oops?";
		return (
			<div>
				<div className={oopsClasses} onClick={this.handleOopsClick} id="oops">
					{text}
				</div>
				<div className="placeholder border p-3 mr-4 mr-md-5 hide">Oops?</div>
			</div>
		);
	}
}

function mapStateToProps({ history }) {
	return { history };
}

export default connect(mapStateToProps)(Oops);
