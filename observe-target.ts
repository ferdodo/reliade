import { Observable, map } from "rxjs";
import { puzzle$ } from "./puzzle-state";
import { Target } from "./target";
import { getTarget } from "./get-target";

export function observeTarget(id: number): Observable<Target> {
    return puzzle$.pipe(map(() => getTarget(id)));
}