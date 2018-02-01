import * as SVG from 'svg.js';
import Point from './Point';
import MazeVisual from './MazeVisual';

enum Direction {
	North,
	South,
	East,
	West
}

export default class WallFollower {
	constructor(private _raster: MazeVisual) { }

	public solve(): void {
		const endPoint = new Point(this._raster.size.width - 1, this._raster.size.height - 1);
		let currentPoint = new Point(0, 0);
		let prevPoint = new Point(-1, -1);

		this.drawRect(currentPoint);

		while (JSON.stringify(currentPoint) !== JSON.stringify(endPoint)) {
			const delta = new Point(currentPoint.x - prevPoint.x, currentPoint.y - prevPoint.y);
			const direction = this.getDirection(delta);
			const priorities = this.getPriorities(direction);

			for (let i = 0; i < priorities.length; i++) {
				const nextPoint = this.nextPoint(currentPoint, priorities[i]);

				// Check for out of bounds & reachable
				if (!this.outOfBounds(nextPoint) && this.reachable(nextPoint)) {

					// Draw the first priority
					this.drawRect(nextPoint);

					// Update the current & previous positions
					prevPoint = currentPoint;
					currentPoint = nextPoint;

					break; // The rest of directions is not relevant
				}
			}
		}
	}

	private pointToCell(point: Point): number {
		// TODO:
		console.log(point);
		return 0;
	}

	private reachable(point: Point): boolean {
		// TODO:
		// Check if allowed 
			// point & nextpoint to cellnumber
			// create [point, nextpoint]
			// look for match in this._walls
		return true;
	}

	private outOfBounds(point: Point): boolean {
		return point.x < 0 || point.x >= this._raster.size.width || point.y < 0 || point.y >= this._raster.size.height;
	}

	private nextPoint(currentPoint: Point, direction: Direction): Point {
		switch (direction) {
			case Direction.North:
				return new Point(currentPoint.x, currentPoint.y - 1);
			case Direction.South:
				return new Point(currentPoint.x, currentPoint.y + 1);
			case Direction.East:
				return new Point(currentPoint.x + 1, currentPoint.y);
			case Direction.West:
				return new Point(currentPoint.x - 1, currentPoint.y);
			default:
				throw new Error('Wrong value of Direction');
		}
	}

	private getPriorities(direction: Direction): Direction[] {
		switch (direction) {
			case Direction.North:
				return [ Direction.East, Direction.North, Direction.West, Direction.South ];
			case Direction.South:
				return [ Direction.West, Direction.South, Direction.East, Direction.North ];
			case Direction.East:
				return [ Direction.South, Direction.East, Direction.North, Direction.West ];
			case Direction.West:
				return [ Direction.North, Direction.West, Direction.South, Direction.East ];
			default:
				throw new Error('Wrong value of Direction');
		}

		// TODO: if(leftHandRule) { switch positions of array[0] and array[2] }
	}

	private getDirection(delta: Point): Direction {
		if (delta.x === 1) {
			return Direction.East;
		}

		if (delta.x === -1) {
			return Direction.West;
		}

		if (delta.y === 1) {
			return Direction.South;
		}

		if (delta.y === -1) {
			return Direction.North;
		}

		throw new Error('Did not receive a correct delta');
	}

	private drawRect(point: Point, padding: number = 3): SVG.Rect {
		return this._raster.context
			.rect(this._raster.CELL_SIZE - (padding * 2), this._raster.CELL_SIZE - (padding * 2))
			.x((point.x * this._raster.CELL_SIZE) + padding)
			.y((point.y * this._raster.CELL_SIZE) + padding)
			.fill({ color: '#43DDE6' })
			.stroke({ width: 0 });
	}
}