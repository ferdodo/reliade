import { Puzzle } from './puzzle';
import { Link } from './link';
import { Connector } from './connector';
import { Candidate } from './candidate';
import { isBlockAdjacent, isBlockColliding } from './block';
import { getPuzzleBlocks } from './get-puzzle-blocks';

export function isCandidateLegal(puzzle: Puzzle): boolean {
    if (
        !isCandidateNotNull(puzzle) ||
        !isConnectorRelatedToCandidate(puzzle) ||
        !isConnectorRelatedToFirstLink(puzzle) ||
        !isConnectorAdjacentToFirstLink(puzzle) ||
        !isCandidateLinksChainingEachOther(puzzle) ||
        !isCandidateLinksAdjacent(puzzle) ||
        !isCandidateLinkNotCollidingPuzzleBlocks(puzzle) ||
        !isCandicateLinkNotCollindingOtherCandidatesLink(puzzle)
    ) {
        return false;
    }

    return true;
}


function isCandidateNotNull(puzzle: Puzzle): boolean {
    return !!puzzle.candidate;
}

function isConnectorRelatedToCandidate(puzzle: Puzzle): boolean {
    const candidate: Candidate | null = puzzle.candidate;

    if (!candidate) {
        return false;
    }

    return !!puzzle.connectors.find(c => c.id === candidate.connectorId);
}

function isConnectorRelatedToFirstLink(puzzle: Puzzle): boolean {
    const candidate: Candidate | null = puzzle.candidate;

    if (!candidate) {
        return false;
    }

    const connector: Connector | undefined = puzzle.connectors.find(c => c.id === candidate.connectorId);

    if (!connector) {
        return false;
    }

    const firstLink: Link = candidate.links[0];

    return connector.id === firstLink.parentId;
}

function isConnectorAdjacentToFirstLink(puzzle: Puzzle): boolean {
    const candidate: Candidate | null = puzzle.candidate;

    if (!candidate) {
        return false;
    }

    const connector: Connector | undefined = puzzle.connectors.find(c => c.id === candidate.connectorId);

    if (!connector) {
        return false;
    }

    const firstLink: Link = candidate.links[0];

    return isBlockAdjacent(connector.block, firstLink.block);
}

function isCandidateLinksChainingEachOther(puzzle: Puzzle): boolean {
    const candidate: Candidate | null = puzzle.candidate;

    if (!candidate) {
        return false;
    }

    const linkIterator = candidate.links[Symbol.iterator]();
    const firstLink: Link = linkIterator.next().value;

    let previousLink = firstLink;

    for (const link of linkIterator) {
        if (link.parentId !== previousLink.id) {
            return false;
        }

        previousLink = link;
    }

    return true;
}

function isCandidateLinksAdjacent(puzzle: Puzzle): boolean {
    const candidate: Candidate | null = puzzle.candidate;

    if (!candidate) {
        return false;
    }

    const linkIterator = candidate.links[Symbol.iterator]();
    const firstLink: Link = linkIterator.next().value;

    let previousLink = firstLink;

    for (const link of linkIterator) {
        if (!isBlockAdjacent(previousLink.block, link.block)) {
            return false;
        }

        previousLink = link;
    }

    return true;
}

function isCandidateLinkNotCollidingPuzzleBlocks(puzzle: Puzzle): boolean {
    const candidate: Candidate | null = puzzle.candidate;

    if (!candidate) {
        return false;
    }

    const puzzleBlocks = getPuzzleBlocks(puzzle);

    for (const link of candidate.links) {
        for (const block of puzzleBlocks) {
            if (isBlockColliding(link.block, block)) {
                return false;
            }
        }
    }

    return true;
}


function isCandicateLinkNotCollindingOtherCandidatesLink(puzzle: Puzzle): boolean {
    const candidate: Candidate | null = puzzle.candidate;

    if (!candidate) {
        return false;
    }

	const linksCoordinatesAlias = candidate.links.map(link => `${link.block.x}-${link.block.y}`);
	const candidateLinkCoordinates: Set<string> = new Set(linksCoordinatesAlias);
	return candidateLinkCoordinates.size === candidate.links.length;
}
