import { getPuzzle } from "./puzzle-state";
import { Connector } from "./connector";

export function getConnector(id: number): Connector {
    const puzzle = getPuzzle();
    const connector: Connector | undefined = puzzle.connectors.find(c => c.id === id);

    if (!connector) {
        throw new Error(`Connector with id ${id} not found !`);
    }

    return connector;
}