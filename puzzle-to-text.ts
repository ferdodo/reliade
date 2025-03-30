import type { Puzzle } from "./puzzle";
import { puzzleToSymbol } from "./puzzle-to-symbol";

export function puzzleToText(puzzle: Puzzle): string {
	let result = "";

	for (let x = 0; x < puzzle.block.w; x++) {
		for (let y = 0; y < puzzle.block.h; y++) {
			result += puzzleToSymbol(puzzle, x, y);
		}

		result += "\n";
	}

	return result;
}
