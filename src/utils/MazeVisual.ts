import Point from './Point';
import Size from './Size';
import * as SVG from 'svg.js';

export default class MazeVisual {
	private _context: SVG.Doc;
	
	constructor(
		private _element: HTMLElement,
		private _size: Size,
		private _walls: number[][],
		public readonly CELL_SIZE: number = 20
	) {	}

	public get context(): SVG.Doc {
		return this._context;
	}

	public get sizeToPixels(): Size {
		return new Size(this._size.height * this.CELL_SIZE, this._size.width * this.CELL_SIZE);
	}

	public cellToPoint(cell: number): Point {
		const rem = cell % this._size.width;
		const x = rem === 0 ? this._size.width : rem;
		const y = Math.ceil(cell / this._size.width);
		return new Point(x, y);
	}

	public pointToCell(point: Point): number {
		let cell = point.x;
		cell += ((point.y - 1) * this._size.width); // + _size.width for every y, starting from 0
		return cell;
	}

	public pointToPixel(point: Point): Point {
		return new Point((point.x - 1) * this.CELL_SIZE, (point.y - 1) * this.CELL_SIZE);
	}

	public draw(): void {
		// Clear previous drawing
		this.clear();
		// Create new svg with defaults 
		this._context = this.drawDefaults();
		
		// Draw walls
		for (let i = 0; i < this._walls.length; i++) {
			const point1 = this.pointToPixel(this.cellToPoint(this._walls[i][0]));
			const point2 = this.pointToPixel(this.cellToPoint(this._walls[i][1]));
			this._context.line(point1.x + this.CELL_SIZE, point1.y + this.CELL_SIZE, point2.x, point2.y);
		}

		this.drawBounds();
	}

	private drawBounds(): void {
		const { width, height } = this.sizeToPixels;

		this._context.line(0, 0, width, 0);
		this._context.line(width, 0, width, height - this.CELL_SIZE);
		this._context.line(width, height, 0, height);
		this._context.line(0, height, 0, this.CELL_SIZE);
	}

	private drawDefaults(): SVG.Doc {
		return SVG(this._element)
			.size(this.sizeToPixels.width, this.sizeToPixels.height)
			.stroke({ width: 2, color: '#5C636E' });
	}

	private clear(): void {
		const element = this._element.querySelectorAll('svg')[0];
		if (element) { 
			element.remove();
		}
	}
}