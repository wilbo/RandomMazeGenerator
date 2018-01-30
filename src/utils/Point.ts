export class Point {
	constructor(
		public x: number,
		public y: number
	) { }

	public add(value: number): Point {
		this.x += value;
		this.y += value;
		return this;
	}
}