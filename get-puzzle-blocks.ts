import { Puzzle } from "./puzzle";
import { Block } from "./block";

export function getPuzzleBlocks(puzzle: Puzzle): Block[] {
    return [
        ...puzzle.connectors.map(c => c.block),
        ...puzzle.targets.map(t => t.block),
        ...puzzle.links.map(l => l.block)
    ];
}