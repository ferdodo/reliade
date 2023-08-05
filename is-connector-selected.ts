import { Connector } from './connector';
import { Candidate } from './candidate';

export function isConnectorSelected(connector: Connector, candidate: Candidate | null): boolean {
    return candidate?.connectorId === connector.id;
}