import { Block } from './block';
import { Connector } from './connector';
import { Link } from './link';
import { Target } from './target';
import { Candidate } from './candidate';

export interface Puzzle {
    block: Block;
    connectors: Connector[];
    links: Link[];
    targets: Target[];
    candidate: Candidate | null;
}
