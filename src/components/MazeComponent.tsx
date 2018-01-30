import * as React from 'react';
import { Raster } from '../utils/Raster';
import { DisjointSets } from '../utils/DisjointSets';
import { MazeGenerator } from '../utils/MazeGenerator';
import * as SVG from 'svg.js';
import { EventHandler } from 'react';

class MazeComponent extends React.Component {
	_size: number = 480;
	
	state = {
		size: 20
	};

	componentDidMount() {
		this.generate();
	}

	handleChange = (evt: React.FormEvent<HTMLInputElement>): void => {
		let value = parseInt(evt.currentTarget.value, 0);
		this.setState({ size: value > 100 ? 100 : value });
	}

	handleOnClick = () => this.generate();

	generate = () => {
		const mg = new MazeGenerator(this.state.size);
		mg.generate();
		
		const old = document.querySelectorAll('svg')[0];
		if (old) { old.remove(); }
		
		const raster = new Raster(SVG('maze-canvas'), mg.size, mg.cells, mg.walls);
		raster.draw();
	}

	render() {
		return (
			<div className="maze-container">
				<div id="maze-canvas" />
				<div style={{ marginBottom: 10 }}>
					Size: <input type="range" value={this.state.size} onChange={this.handleChange} min="2" max="100" /> {this.state.size}
				</div>
				<button onClick={this.handleOnClick}>Generate</button>
			</div>
		);
	}
}

export default MazeComponent;
