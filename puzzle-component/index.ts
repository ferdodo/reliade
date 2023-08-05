import { Ref, ref, defineComponent } from "vue";
import { render } from "./template";
import { Puzzle } from "../puzzle";
import { addLinkToCandidate, getPuzzle, puzzle$ } from "../puzzle-state";
import { ConnectorComponent } from "../connector-component";
import { LinkComponent } from "../link-component";
import { TargetComponent } from "../target-component";

export const PuzzleComponent = defineComponent({
	components: {
		ConnectorComponent,
		LinkComponent,
		TargetComponent
	},
	setup() {
		const puzzle: Ref<Puzzle> = ref(getPuzzle());
		puzzle$.subscribe(value => puzzle.value = value);
		return { puzzle, addLinkToCandidate };
	},
	render
});
