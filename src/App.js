import React from "react";
import Flashcard from "./flashcard";
import Controls from "./controls";
import Oops from "./oops";
import Stopwatch from "./stopwatch";
import { connect } from "react-redux";
import { toggleControls } from "./actions/index";
import "./App.css";

class App extends React.Component {
	constructor() {
		super();
		this.show = this.show.bind(this);
	}

	show() {
		return this.props.viewControls ? (
			<Controls />
		) : (
			<div className="d-block">
				<div className="d-flex align-items-center mb-4">
					<Oops />
					<Flashcard />
				</div>
				<Stopwatch />
			</div>
		);
	}

	render() {
		const buttonText = this.props.viewControls
			? "Hide Controls"
			: "Show Controls";
		const appClasses = this.props.viewControls ? "App bg-light" : "App";
		return (
			<div className={appClasses}>
				<nav className="text-left pt-3 container position-relative">
					<button
						className="btn btn-primary"
						onClick={() => this.props.dispatch(toggleControls())}
					>
						{buttonText}
					</button>
				</nav>
				<main className="app-main">{this.show()}</main>
			</div>
		);
	}
}

function mapStateToProps({ viewControls }) {
	return { viewControls };
}

export default connect(mapStateToProps)(App);
