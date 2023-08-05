import { Observable, map } from "rxjs";
import { puzzle$ } from "./puzzle-state";
import { Candidate } from "./candidate";
import { getCandidate } from "./get-candidate";

export function observeCandidate(): Observable<Candidate | null> {
    return puzzle$.pipe(map(() => getCandidate()));
}