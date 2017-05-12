import React, { Component } from 'react';
import TimerSVG from './TimerSVG';

class TimerNewButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			onClick: props.onClick,
		}
	}

	render() {
		return (
			<div className="new_timer_btn">
				<button id="new_timer_btn"
					title="New Timer"
					onClick={this.state.onClick}>
					<TimerSVG />
				</button>
			</div>
		);
	}
}

export default TimerNewButton;
