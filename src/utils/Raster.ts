import { Point } from './Point';
import * as SVG from 'svg.js';

export class Raster {
	constructor(
		private _context: SVG.Doc, 
		private _size: number, 
		private _cells: number[], 
		private _walls: number[][], 
		private _width: number = 480
	) {
		this._context.size(this._width, this._width).stroke({ width: 2, color: '#666' });
	}

	public get squareSize(): number {
		return this._width / this._size;
	}

	public cellToPixels(cell: number, center: boolean = false): Point {
		let x = cell;
		let y = cell;

		// X-axis, reset when higher than size
		while (x > this._size) {
			x -= this._size;
		}

		// Y-axis, divide by size
		y = Math.ceil(y / this._size);

		return new Point((x - 1) * this.squareSize, (y - 1) * this.squareSize).add(center ? (this.squareSize / 2) : 0);
	}

	public draw(): void {
		// Draw _| shape for every square
		for (let i = 0; i < this._walls.length; i++) {
			const point1 = this.cellToPixels(this._walls[i][0]);
			const point2 = this.cellToPixels(this._walls[i][1]);
			this._context.line(point1.x + this.squareSize, point1.y + this.squareSize, point2.x, point2.y);
		}

		this.drawBounds();
	}

	private drawBounds(): void {
		this._context.line(0, 0, this._width, 0);
		this._context.line(this._width, 0, this._width, this._width - this.squareSize);
		this._context.line(this._width, this._width, 0, this._width);
		this._context.line(0, this._width, 0, this.squareSize);
	}
}