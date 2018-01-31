import Point from './Point';
import Size from './Size';
import * as SVG from 'svg.js';

export default class Raster {
	constructor(
		private _context: SVG.Doc, 
		private _size: Size, 
		private _cells: number[], 
		private _walls: number[][]
	) {
		this._context.size(this.sizeToPixels.width, this.sizeToPixels.height).stroke({ width: 2, color: '#5C636E' });
	}

	public get cellSize(): number {
		return 20;
	}

	public get sizeToPixels(): Size {
		return new Size(this._size.height * this.cellSize, this._size.width * this.cellSize);
	}

	public cellToPixels(cell: number, center: boolean = false): Point {
		let x = cell;
		let y = cell;

		// X-axis, reset when higher than size width
		while (x > this._size.width) {
			x -= this._size.width;
		}

		// Y-axis, divide by size
		y = Math.ceil(y / this._size.width);

		return new Point((x - 1) * this.cellSize, (y - 1) * this.cellSize).add(center ? (this.cellSize / 2) : 0);
	}

	public draw(): void {
		// Draw _| shape for every square
		for (let i = 0; i < this._walls.length; i++) {
			const point1 = this.cellToPixels(this._walls[i][0]);
			const point2 = this.cellToPixels(this._walls[i][1]);
			this._context.line(point1.x + this.cellSize, point1.y + this.cellSize, point2.x, point2.y);
		}

		this.drawBounds();
	}

	private drawBounds(): void {
		const { width, height } = this.sizeToPixels;

		this._context.line(0, 0, width, 0);
		this._context.line(width, 0, width, height - this.cellSize);
		this._context.line(width, height, 0, height);
		this._context.line(0, height, 0, this.cellSize);
	}
}