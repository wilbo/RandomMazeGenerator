import DisjointSets from './DisjointSets';
import Size from './Size';

export class MazeGenerator {
	public cells: number[];
	public walls: number[][];

	constructor(
		public size: Size = new Size(20, 30)
	) {
		this.generateCells();
		this.generateWalls();
	}

	// Generate a random maze using the DisjointSets class
	public generate(): void {
		const walls: number[][] = [];
		const ds = new DisjointSets(this.cells.length);

		while (this.walls.length > 0) {
			const randomWall = this.randomWall();
			const root1 = ds.find(randomWall[0]);
			const root2 = ds.find(randomWall[1]);
			root1 !== root2 ? ds.union(root1, root2) : walls.push(randomWall);
		}
		
		this.walls = walls;
	}

	// Fill the cells array
	private generateCells(): void {
		this.cells = [];
		for (let i = 1; i <= this.size.height * this.size.width; i++) {
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

			if (next && current % this.size.width !== 0) {
				this.walls.push([current, next]);
			}
		}

		// horizontal walls
		for (let i = 0; i < this.cells.length; i++) {
			const current = this.cells[i];
			const next = this.cells[i + this.size.width];

			if (next) {
				this.walls.push([current, next]);
			}
		}
	}

	// Pick a random wall from walls and remove it
	private randomWall(): number[] {
		const index = Math.floor(Math.random() * this.walls.length);
		return this.walls.splice(index, 1)[0];
	}
}