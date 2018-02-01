import * as React from 'react';
import * as SVG from 'svg.js';
import MazeVisual from '../utils/MazeVisual';
import DisjointSets from '../utils/DisjointSets';
import { Maze } from '../utils/Maze';
import Size from '../utils/Size';
import WallFollower from '../utils/WallFollower';

interface State {
	size: Size;
}

class MazeComponent extends React.Component<{}, State> {	
	visualElement: HTMLElement;
	state = {
		size: new Size(20, 30)
	};

	componentDidMount() {
		this.generate();
	}
	
	handleOnClick = () => this.generate();

	changeHeight = (evt: React.FormEvent<HTMLInputElement>): void => {
		let value = parseInt(evt.currentTarget.value, 0);
		value > 100 ? 100 : value;
		this.setState((prevState: State) => ({ size: new Size(value, prevState.size.width) }));
	}

	changeWidth = (evt: React.FormEvent<HTMLInputElement>): void => {
		let value = parseInt(evt.currentTarget.value, 0);
		value > 100 ? 100 : value;
		this.setState((prevState: State) => ({ size: new Size(prevState.size.height, value) }));
	}

	generate = () => {
		const maze = new Maze(this.state.size);
		maze.generate();

		const visual = new MazeVisual(this.visualElement, maze.size, maze.walls);
		visual.draw();
		
		// const wf = new WallFollower(raster);
		// wf.solve();
	}

	render() {
		return (
			<div className="maze-container">
				<div ref={(ref: HTMLDivElement) => this.visualElement = ref} />
				<div style={{ marginBottom: 10 }}>
					height: <input type="range" value={this.state.size.height} onChange={this.changeHeight} min="2" max="100" /> {this.state.size.height} <br />
					width: <input type="range" value={this.state.size.width} onChange={this.changeWidth} min="2" max="100" /> {this.state.size.width}
				</div>
				<button onClick={this.handleOnClick}>Generate</button>
			</div>
		);
	}
}

export default MazeComponent;
