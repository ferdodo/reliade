import { Observable, map, filter } from "rxjs";
import { puzzle$ } from "./puzzle-state";
import { Link } from "./link";
import { getLink } from "./get-link";

export function observeLink(id: number): Observable<Link> {
    return puzzle$.pipe(
        filter(function (puzzle) {
            // not finding link is not an error as
            // they get normally removed on candidate commit
            return puzzle.links.some(l => l.id === id)
                || puzzle.candidate?.links.some(l => l.id === id)
                || false;
        }),
        map(() => getLink(id))
    );
}