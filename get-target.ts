import { getPuzzle } from "./puzzle-state";
import { Target } from "./target";

export function getTarget(id: number): Target {
    const puzzle = getPuzzle();
    const target: Target | undefined = puzzle.targets.find(c => c.id === id);

    if (!target) {
        throw new Error(`Target with id ${id} not found !`);
    }

    return target;
}