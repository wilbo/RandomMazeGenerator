import * as React from 'react';
import * as SVG from 'svg.js';
import MazeVisual from '../utils/MazeVisual';
import DisjointSets from '../utils/DisjointSets';
import Maze from '../utils/Maze';
import Size from '../utils/Size';
import WallFollower from '../utils/WallFollower';

interface State {
	size: Size;
}

class MazeComponent extends React.Component<{}, State> {	
	wallFollower: WallFollower;
	wallFollowerLeft: WallFollower;
	visualElement: HTMLElement;

	state = {
		size: new Size(20, 30)
	};

	componentDidMount() {
		this.generate();
	}
	
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
		
		this.wallFollower = new WallFollower(maze, visual);
		this.wallFollowerLeft = new WallFollower(maze, visual, true);
	}

	solve = () => {
		this.wallFollower.solve();
	}

	solveLeft = () => {
		this.wallFollowerLeft.solve();
	}

	render() {
		return (
			<div className="maze-container">
				<div ref={(ref: HTMLDivElement) => this.visualElement = ref} />
				<div style={{ marginBottom: 10 }}>
					height: <input type="range" value={this.state.size.height} onChange={this.changeHeight} min="2" max="100" /> {this.state.size.height} <br />
					width: <input type="range" value={this.state.size.width} onChange={this.changeWidth} min="2" max="100" /> {this.state.size.width}
				</div>
				<button onClick={this.generate}>Generate</button>
				<button onClick={this.solve}>Solve keeping right</button>
				{/* <button onClick={this.solveLeft}>Solve keeping left</button> */}
			</div>
		);
	}
}

export default MazeComponent;
