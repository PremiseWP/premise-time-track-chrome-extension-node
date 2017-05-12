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
			<div className="stop_timer_btn">
				<button id="stop_timer_btn"
					title="Stop Timer"
					onClick={this.state.onClick}>
					<TimerSVG />
				</button>
			</div>
		);
	}
}

export default TimerStopButton;
