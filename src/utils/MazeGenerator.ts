import { DisjointSets } from './DisjointSets';

export class MazeGenerator {
	public cells: number[];
	public walls: number[][];

	constructor(
		public size: number = 5
	) {
		this.generateCells();
		this.generateWalls();
	}

	// Generate a random maze
	public generate(): void {
		const ds = new DisjointSets(this.cells.length);
		const maze: number[][] = [];

		while (this.walls.length > 0) {
			const randomWall = this.randomWall();
			const u = ds.find(randomWall[0]);
			const v = ds.find(randomWall[1]);
			u !== v ? ds.union(u, v) : maze.push(randomWall);
		}

		maze.forEach(item => this.walls.push(item));
	}

	// Fill the cells array
	private generateCells(): void {
		this.cells = [];
		for (let i = 1; i <= this.size * this.size; i++) {
			this.cells.push(i);
		}
	}

	// Fill the wall array
	private generateWalls(): void {
		this.walls = [];

		// vertical walls
		for (let i = 0; i < this.cells.length; i++) {
			const current = this.cells[i];
			const next = this.cells[i + 1];

			if (next && current % this.size !== 0) {
				this.walls.push([current, next]);
			}
		}

		// horizontal walls
		for (let i = 0; i < this.cells.length; i++) {
			const current = this.cells[i];
			const next = this.cells[i + this.size];

			if (next) {
				this.walls.push([current, next]);
			}
		}
	}

	// Pick a random wall from walls
	private randomWall(): number[] {
		const index = Math.floor(Math.random() * this.walls.length);
		return this.walls.splice(index, 1)[0];
	}
}