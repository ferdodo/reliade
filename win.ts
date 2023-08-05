import { Observable, map } from "rxjs";
import { puzzle$ } from "./puzzle-state"

export const win$: Observable<boolean> = puzzle$.pipe(
    map(puzzle => puzzle.connectors.every(connector => puzzle.links.some(link => link.parentId === connector.id)))
);