import { Puzzle } from './puzzle';
import { Link } from './link';
import { Target } from './target';
import { Connector } from './connector';
import { Candidate } from './candidate';
import { isBlockAdjacent } from './block';
import { isCandidateLegal } from './is-candidate-legal';


export function isCandidateComplete(puzzle: Puzzle): boolean {
    if (
        !isTargetAdjacentToLastLink(puzzle) ||
        !isCandidateLegal(puzzle)

    ) {
        return false;
    }

    return true;
}

function isTargetAdjacentToLastLink(puzzle: Puzzle): boolean {
    const candidate: Candidate | null = puzzle.candidate;

    if (!candidate) {
        return false;
    }

    const connector: Connector | undefined = puzzle.connectors.find(c => c.id === candidate.connectorId);

    if (!connector) {
        return false;
    }

    const target: Target | undefined = puzzle.targets.find(t => t.id === connector.targetId);

    if (!target) {
        return false;
    }

    const lastLink: Link = candidate.links[candidate.links.length - 1];

    return isBlockAdjacent(lastLink.block, target.block);
}


