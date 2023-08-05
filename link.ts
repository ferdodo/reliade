import { Block } from "./block";

export interface Link {
    id: number;
    parentId: number;
    block: Block;
    colorId: number;
}
