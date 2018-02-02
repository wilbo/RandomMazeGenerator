import * as SVG from 'svg.js';
import Point from './Point';
import MazeVisual from './MazeVisual';
import Size from './Size';
import Maze from './Maze';

enum Direction {
	North,
	South,
	East,
	West
}

export default class WallFollower {
	constructor(
		private _maze: Maze,
		private _mazeVisual: MazeVisual,
		private _leftHand: boolean = false
	) { }

	public solve(): void {
		const endPoint = new Point(this._maze.size.width, this._maze.size.height);
		// console.log(endPoint);
		let currentPoint = new Point(1, 1);
		let prevPoint = new Point(0, 0);

		this.drawRect(currentPoint);

		while (JSON.stringify(currentPoint) !== JSON.stringify(endPoint)) {
			const delta = new Point(currentPoint.x - prevPoint.x, currentPoint.y - prevPoint.y);
			const direction = this.getDirection(delta);
			const priorities = this.getPriorities(direction, this._leftHand);

			for (let i = 0; i < priorities.length; i++) {
				const nextPoint = this.nextPoint(currentPoint, priorities[i]);

				// Check for out of bounds & reachable
				if (!this.outOfBounds(nextPoint) && this.reachable(currentPoint, nextPoint)) {
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

	private reachable(currentPoint: Point, nextPoint: Point): boolean {
		const cell1 = this._mazeVisual.pointToCell(currentPoint);
		const cell2 = this._mazeVisual.pointToCell(nextPoint);

		for (let i = 0; i < this._maze.walls.length; i++) {
			if (cell1 === this._maze.walls[i][0] && cell2 === this._maze.walls[i][1]) {
				return false;
			}

			if (cell2 === this._maze.walls[i][0] && cell1 === this._maze.walls[i][1]) {
				return false;
			}
		}

		return true;
	}

	private outOfBounds(nextPoint: Point): boolean {
		return nextPoint.x < 1 || nextPoint.x > this._maze.size.width || nextPoint.y < 1 || nextPoint.y > this._maze.size.height;
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

	private getPriorities(direction: Direction, leftHand: boolean = false): Direction[] {
		switch (direction) {
			case Direction.North:
				return leftHand ? [ Direction.South, Direction.East, Direction.North, Direction.West ] : [ Direction.East, Direction.North, Direction.West, Direction.South ];
			case Direction.South:
				return [ Direction.West, Direction.South, Direction.East, Direction.North ];
			case Direction.East:
				return leftHand ? [ Direction.East, Direction.North, Direction.West, Direction.South ] : [ Direction.South, Direction.East, Direction.North, Direction.West ];
			case Direction.West:
				return [ Direction.North, Direction.West, Direction.South, Direction.East ];
			default:
				throw new Error('Wrong value of Direction');
		}
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

	private drawRect(point: Point, padding: number = 0): SVG.Rect {
		const position = this._mazeVisual.pointToPixel(point);

		return this._mazeVisual.context
			.rect(this._mazeVisual.CELL_SIZE - (padding * 2), this._mazeVisual.CELL_SIZE - (padding * 2))
			.x(position.x + padding)
			.y(position.y + padding)
			.fill({ color: this._leftHand ? '#FC4442' : '#43DDE6', opacity: .4 })
			.stroke({ width: 0 });
	}
}