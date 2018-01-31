/*	
	The DisjointSets Data Structure
	More info: https://en.wikipedia.org/wiki/Disjoint-set_data_structure
*/

export default class DisjointSets {
	private _s: Array<number>;

	constructor(numElems: number = 10) {
		this._s = [];

		for (let i = 0; i <= numElems; i++) {
			this._s.push(-1);
		}
	}

	// Union two disjoint sets using the height heuristic.
	// root1 and root2 are distinct and represent set names.
	public union(root1: number, root2: number): void {
		this.assertIsRoot(root1);
		this.assertIsRoot(root2);

		if (root1 === root2) {
			throw new Error('Both root 1 & 2 cannot be the same');
		}

		if (this._s[root2] < this._s[root1]) { 			// root2 is deeper
			this._s[root1] = root2;										// Make root2 new root
		} else {
			if (this._s[root1] === this._s[root2]) {	// Equal
				this._s[root1]--;												// Update height
			}

			this._s[root2] = root1; 									// Make root1 new root
		}
	}
		
	// Perform a find with path compression.
	// Path compression: Makes every accessed item a child of the root until another union occurs.
	public find(item: number): number {
		this.assertIsItem(item);

		if (this._s[item] < 0) {
			return item;
		} else {
			return this._s[item] = this.find(this._s[item]);
		}
	}

	public toString(): string {
		return this._s.toString();
	}

	private assertIsRoot(item: number): void {
		this.assertIsItem(item);
		if (this._s[item] >= 0) {
			throw new Error('item is not a root');
		}
	}

	private assertIsItem(item: number): void {
		if (item < 0 || item >= this._s.length) {
			console.log(item);
			throw new Error('item is not a valid item');
		}
	}
}
