import { Puzzle } from "./puzzle";
import { generateId } from "./generate-id";
import { Target } from "./target";
import { Connector } from "./connector";
import { Link } from "./link";
import { getPuzzleBlocks } from "./get-puzzle-blocks";
import { Block, isBlockColliding, isBlockIncluded, blockDistance } from "./block";
import { randomNumber } from "./random-number";

export function generatePuzzle(): Puzzle {
    const puzzle: Puzzle = {
        block: {
            x: 0,
            y: 0,
            w: 8,
            h: 8
        },
        connectors: [],
        targets: [],
        links: [],
        candidate: null
    };

    let tries = 0;
    let distance = 10;
	
    for (let colorId = 1; colorId < 6; colorId++) {
        try {
            const connector = generateConnector(puzzle, colorId);
            puzzle.connectors = [...puzzle.connectors, connector];
            let parentBlock = connector.block;
            let parentId = connector.id;


            do {
                const link = generateLink(puzzle, parentBlock, parentId, colorId);
                puzzle.links = [...puzzle.links, link];
                parentBlock = link.block;
                parentId = link.id;
            } while (blockDistance(parentBlock, connector.block) < distance);
            
            const lastLink = puzzle.links[puzzle.links.length - 1];
            const target = generateTarget(puzzle, lastLink!.block, colorId);
            puzzle.connectors[puzzle.connectors.length - 1].targetId = target.id;
            puzzle.targets = [...puzzle.targets, target];
            distance = 10;
        } catch(e) {
            puzzle.connectors = puzzle.connectors.filter(c => c.colorId !== colorId);
            puzzle.links = puzzle.links.filter(l => l.colorId !== colorId);
            puzzle.targets = puzzle.targets.filter(t => t.colorId !== colorId);
            colorId--;
            tries++;

            if (distance < 1) {
                return generatePuzzle();
            }

            if (tries > 10 && distance > 1) {
                distance = distance * 0.99;
            }
        }
    }	

    puzzle.links = [];

    return puzzle;
}

function generateTarget(puzzle: Puzzle, block: Block, colorId: number): Target {
    let newBlock = generateAdjacentBlock(puzzle, block);
    
    return {
        id: generateId(),
        block: newBlock,
        colorId
    };
}

function generateBlock(puzzle: Puzzle): Block {
    return {
        x: randomNumber(0, puzzle.block.w),
        y: randomNumber(0, puzzle.block.h),
        w: 1,
        h: 1
    };
}

function generateAdjacentBlock(puzzle: Puzzle, block: Block): Block {
    const direction: number = randomNumber(0, 4);
    const newBlock = generateBlock(puzzle);
    const blocks: Block[] = getPuzzleBlocks(puzzle);
    let tries = 0;

    do {
        switch (direction) {
            case 0:
                newBlock.x = block.x + 1;
                newBlock.y = block.y;
                break;
            case 1:
                newBlock.x = block.x - 1;
                newBlock.y = block.y;
                break;
            case 2:
                newBlock.x = block.x;
                newBlock.y = block.y + 1;
                break;
            case 3:
                newBlock.x = block.x;
                newBlock.y = block.y - 1;
                break;
            default:
                throw new Error('Invalid direction !');
        }

        tries++;

        if (tries > 3) {
            throw new Error('Unable to generate adjacent block !');
        }
    } while (
        !isBlockIncluded(puzzle.block, newBlock)
        || blocks.some(b => isBlockColliding(newBlock, b))
    );

    return newBlock;
}

function generateLink(puzzle: Puzzle, block: Block, parentId: number, colorId: number): Link {
    const newBlock: Block = generateAdjacentBlock(puzzle, block);

    return {
        id: generateId(),
        block: newBlock,
        colorId: colorId,
        parentId: parentId
    };
}

function generateConnector(puzzle: Puzzle, colorId: number): Connector {
    const blocks: Block[] = getPuzzleBlocks(puzzle);
    let block = generateBlock(puzzle);
    let tries = 0;

    do {
        block = generateBlock(puzzle);

        tries++;

        if (tries > 3) {
            throw new Error('Unable to generate connector !');
        }

    } while (blocks.some(b => isBlockColliding(block, b)));

    return {
        id: generateId(),
        block,
        colorId,
        targetId: 0
    };
}


