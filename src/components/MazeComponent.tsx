import * as React from 'react';
import * as SVG from 'svg.js';
import Raster from '../utils/Raster';
import DisjointSets from '../utils/DisjointSets';
import { MazeGenerator } from '../utils/MazeGenerator';
import Size from '../utils/Size';
import WallFollower from '../utils/WallFollower';

interface State {
	size: Size;
}

class MazeComponent extends React.Component<{}, State> {	
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
		const mg = new MazeGenerator(this.state.size);
		mg.generate();
		
		const old = document.querySelectorAll('svg')[0];
		if (old) { old.remove(); }
		
		const raster = new Raster(SVG('maze'), mg.size, mg.walls);
		raster.draw();

		const wf = new WallFollower(raster);
		wf.solve();
	}

	render() {
		return (
			<div className="maze-container">
				<div id="maze" />
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
