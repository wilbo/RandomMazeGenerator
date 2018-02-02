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
	wallFollowerRight: WallFollower;
	wallFollowerLeft: WallFollower;
	visualElement: HTMLElement;

	state = {
		size: new Size(20, 30)
	};

	componentDidMount() {
		this.generate();
	}
	
	handleChange = (evt: React.FormEvent<HTMLInputElement>, changeHeight: boolean = false): void => {
		const value = parseInt(evt.currentTarget.value, 0);		
		const { height, width } = this.state.size;
		const size = changeHeight ? new Size(value, width)  : new Size(height, value);
		this.setState({ size });
	}

	generate = () => {
		const maze = new Maze(this.state.size);
		maze.generate();

		const visual = new MazeVisual(this.visualElement, maze.size, maze.walls);
		visual.draw();
		
		this.wallFollowerRight = new WallFollower(maze, visual);
		this.wallFollowerLeft = new WallFollower(maze, visual, true);
	}

	solveRight = () => {
		this.wallFollowerRight.solve();
	}

	solveLeft = () => {
		this.wallFollowerLeft.solve();
	}

	render() {
		return (
			<div className="maze-container">
				<h1>Maze Generator</h1>
				<div ref={(ref: HTMLDivElement) => this.visualElement = ref} />
				<div style={{ margin: 20 }}>
					height: <input type="range" value={this.state.size.height} onChange={evt => this.handleChange(evt, true)} min="2" max="100" /> {this.state.size.height} <br />
					width: <input type="range" value={this.state.size.width} onChange={evt => this.handleChange(evt)} min="2" max="100" /> {this.state.size.width}
				</div>
				<button onClick={this.generate}>Generate</button>
				<button onClick={this.solveRight}>Solve keeping right</button>
				<button onClick={this.solveLeft}>Solve keeping left</button>
			</div>
		);
	}
}

export default MazeComponent;
