import { Puzzle } from "./puzzle";
import { puzzle$ } from "./puzzle-state";
import { map, Observable } from "rxjs";

export const puzzleFilling$: Observable<number> = puzzle$.pipe(
	map(function(puzzle: Puzzle) {
		const slotCount = puzzle.block.h * puzzle.block.w;

		let filledSlots = puzzle.connectors.length
			+ puzzle.links.length
			+ puzzle.targets.length;

		return Math.floor((filledSlots * 100) / slotCount);
	})
);
