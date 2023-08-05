import { getPuzzle } from "./puzzle-state";
import { Link } from "./link";

export function getLink(id: number): Link {
    const puzzle = getPuzzle();
    const link: Link | undefined = puzzle.links.find(c => c.id === id) || puzzle.candidate?.links.find(c => c.id === id);

    if (!link) {
        throw new Error(`Link with id ${id} not found !`);
    }

    return link;
}