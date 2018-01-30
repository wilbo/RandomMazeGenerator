import * as React from 'react';
import './MazeComponent.css';
import { Raster } from '../utils/Raster';
import { DisjointSets } from '../utils/DisjointSets';
import { MazeGenerator } from '../utils/MazeGenerator';
import * as SVG from 'svg.js';

class MazeComponent extends React.Component {
	_size: number = 480;

	componentDidMount() {
		this.generate();
	}

	handleOnClick = () => {
		this.generate();
	}

	generate = () => {
		const mg = new MazeGenerator(20);
		mg.generate();
		
		const old = document.querySelectorAll('svg')[0];
		if (old) { old.remove(); }
		
		const svg = SVG('maze-canvas').size(this._size, this._size).stroke({ width: 1 });
		const raster = new Raster(svg, mg.size, mg.cells, mg.walls);
		raster.draw();
	}

	render() {
		return (
			<div className="maze-container">
				<div id="maze-canvas" />
				<br /><br />
				<button onClick={this.handleOnClick}>new maze!</button>
			</div>
		);
	}
}

export default MazeComponent;
