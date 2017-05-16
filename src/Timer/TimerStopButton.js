import React, { Component } from 'react';
import TimerSVG from './TimerSVG';

class TimerStopButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			onClick: props.onClick,
		}
	}

	render() {
		return (
			<div>
				<button className="timer-button timer-stop-button"
					title="Stop Timer"
					onClick={this.state.onClick}>
					<TimerSVG />
				</button>
			</div>
		);
	}
}

export default TimerStopButton;
