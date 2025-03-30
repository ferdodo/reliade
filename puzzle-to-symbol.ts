import type { Puzzle } from "./puzzle";

export function puzzleToSymbol(puzzle: Puzzle, x: number, y: number): string {
	for (const connector of puzzle.connectors) {
		if (connector.block.x === x && connector.block.y === y) {
			switch (connector.colorId) {
				case 1:
					return "🟦";
				case 2:
					return "🟥";
				case 3:
					return "🟧";
				case 4:
					return "🟨";
				case 5:
					return "🟩";
			}
		}
	}

	for (const link of puzzle.links) {
		if (link.block.x === x && link.block.y === y) {
			switch (link.colorId) {
				case 1:
					return "🔵";
				case 2:
					return "🔴";
				case 3:
					return "🟠";
				case 4:
					return "🟡";
				case 5:
					return "🟢";
			}
		}
	}

	for (const target of puzzle.targets) {
		if (target.block.x === x && target.block.y === y) {
			switch (target.colorId) {
				case 1:
					return "🟦";
				case 2:
					return "🟥";
				case 3:
					return "🟧";
				case 4:
					return "🟨";
				case 5:
					return "🟩";
			}
		}
	}

	return "⬛";
}
