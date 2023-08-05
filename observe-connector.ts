import { Observable, map } from "rxjs";
import { puzzle$ } from "./puzzle-state";
import { Connector } from "./connector";
import { getConnector } from "./get-connector";

export function observeConnector(id: number): Observable<Connector> {
    return puzzle$.pipe(map(() => getConnector(id)));
}