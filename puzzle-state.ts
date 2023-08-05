import { Observable, BehaviorSubject } from 'rxjs';
import { generatePuzzle } from './generate-puzzle';
import { Puzzle } from './puzzle';
import { getConnector } from './get-connector';
import { isCandidateLegal } from './is-candidate-legal';
import { Link } from './link';
import { generateId } from './generate-id';
import { isCandidateComplete } from './is-candidate-complete';
import { getLink } from './get-link';

const _puzzle$ = new BehaviorSubject<Puzzle>(
    generatePuzzle()
);

export const puzzle$: Observable<Puzzle> = _puzzle$.asObservable();

export function getPuzzle(): Puzzle {
    return _puzzle$.getValue();
}

export function selectConnector(connectorId: number) {
    const puzzle = getPuzzle();

    if (puzzle.candidate) {
        return;
    }

    const connector = getConnector(connectorId);

    const connectorIsLinked = puzzle.links.some(l => l.parentId === connector.id);

    if (connectorIsLinked) {
        return;
    }

    _puzzle$.next({
        ...puzzle,
        candidate: {
            connectorId: connector.id,
            links: []
        }
    });
}

export function commitCandidate() {
    const puzzle = getPuzzle();

    if (isCandidateComplete(puzzle)) {
        _puzzle$.next({
            ...puzzle,
            candidate: null,
            links: [
                ...puzzle.links,
                ...puzzle.candidate!.links
            ]
        });
    } else {
        _puzzle$.next({
            ...puzzle,
            candidate: null
        });
    }
}

export function removeChainLink(linkId: number) {
    const puzzle = getPuzzle();
    const link = getLink(linkId);

    const newPuzzle = {
        ...puzzle,
        links: puzzle.links.filter(l => link.colorId !== l.colorId)
    };

    _puzzle$.next(newPuzzle);
}

export function addLinkToCandidate(x: number, y: number) {
    const puzzle = getPuzzle();

    if (!puzzle.candidate) {
        return;
    }

    const lastLink = puzzle.candidate.links[puzzle.candidate.links.length - 1];
    const connector = getConnector(puzzle.candidate.connectorId);

    const link: Link = {
        id: generateId(),
        parentId: lastLink
            ? lastLink.id
            : connector.id,
        block: {
            x,
            y,
            w: 1,
            h: 1
        },
        colorId: connector.colorId
    };

    const newPuzzle = {
        ...puzzle,
        candidate: {
            ...puzzle.candidate,
            links: [
                ...puzzle.candidate.links,
                link
            ]
        }
    };

    if (!isCandidateLegal(newPuzzle)) {
        return;
    }

    _puzzle$.next(newPuzzle);
}