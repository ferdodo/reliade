import { Ref, ref, defineComponent } from "vue";
import { render } from "./template";
import { Target } from "../target";
import { getTarget } from "../get-target";
import { observeTarget } from "../observe-target";
import { blockXEnd, blockYEnd } from "../block";
import { commitCandidate } from "../puzzle-state";

export const TargetComponent = defineComponent({
    props: {
        id: {
            type: Number,
            required: true
        }
    },
	setup(props) {
		const target: Ref<Target> = ref(getTarget(props.id));
		observeTarget(props.id).subscribe(value => target.value = value);
		return { target, commitCandidate, blockXEnd, blockYEnd };
	},
	render
});
