import { getPuzzle } from "./puzzle-state";
import { Candidate } from "./candidate";

export function getCandidate(): Candidate | null {
    return getPuzzle().candidate;
}