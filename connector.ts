import { Block } from "./block";

export interface Connector {
    id: number;
    block: Block;
    targetId: number;
    colorId: number;
}