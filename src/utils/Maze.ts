import DisjointSets from './DisjointSets';
import Size from './Size';
import Point from './Point';

export class Maze {
	private _walls: number[][];

	constructor(private _size: Size = new Size(20, 30)) {
		this.generateWalls();
	}

	public get size(): Size {
		return this._size;
	}

	public get walls(): number[][] {
		return this._walls;
	}

	// Generate a random maze using the DisjointSets class
	public generate(): void {
		const walls: number[][] = [];
		const ds = new DisjointSets(this._size.height * this._size.width);

		while (this._walls.length > 0) {
			const randomWall = this.randomWall();
			const root1 = ds.find(randomWall[0]);
			const root2 = ds.find(randomWall[1]);
			root1 !== root2 ? ds.union(root1, root2) : walls.push(randomWall);
		}
		
		this._walls = walls;
	}

	// Fill the wall array
	private generateWalls(): void {
		this._walls = [];
		const total = this._size.height * this._size.width;

		// vertical walls
		for (let i = 1; i <= this.cells; i++) {
			const next = i + 1;

			if (next <= this.cells && i % this._size.width !== 0) {
				this._walls.push([i, next]);
			}
		}

		// horizontal walls
		for (let i = 1; i <= this.cells; i++) {
			const next = i + this._size.width;

			if (next <= this.cells) {
				this._walls.push([i, next]);
			}
		}
	}

	private get cells(): number {
		return this._size.height * this._size.width;
	}

	// Pick a random wall from walls and remove it
	private randomWall(): number[] {
		const index = Math.floor(Math.random() * this._walls.length);
		return this._walls.splice(index, 1)[0];
	}
}