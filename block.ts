export interface Block {
	x: number;
	y: number;
	h: number;
	w: number;
}

export function isBlockColliding(a: Block, b: Block) {
	return a.x + a.w> b.x
		&& a.x < b.x+ b.w
		&& a.y + a.h > b.y
		&& a.y < b.y + b.h;
}

export function isBlockIncluded(a: Block, b: Block) {
	return a.x <= b.x
		&& a.y <= b.y
		&& (a.x + a.w) >= (b.x + b.w)
		&& (a.y + a.h) >= (b.y + b.h);
}

export function isBlockAdjacent(a: Block, b: Block) {
	return (a.x + a.w === b.x && a.y === b.y)
		|| (a.x === b.x + b.w && a.y === b.y)
		|| (a.y + a.h === b.y && a.x === b.x)
		|| (a.y === b.y + b.h && a.x === b.x);
}

export function blockXEnd(block: Block) {
	return block.x + block.w;
}

export function blockYEnd(block: Block) {
	return block.y + block.h;
}

export function blockDistance(a: Block, b: Block): number {
	const distance = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
	return distance;
}