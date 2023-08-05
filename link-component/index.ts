import { Ref, ref, defineComponent, onUnmounted } from "vue";
import { render } from "./template";
import { Link } from "../link";
import { getLink } from "../get-link";
import { observeLink } from "../observe-link";
import { blockXEnd, blockYEnd } from "../block";
import { commitCandidate, removeChainLink } from "../puzzle-state";
import { Candidate } from "../candidate";
import { getCandidate } from "../get-candidate";
import { observeCandidate } from "../observe-candidate";

export const LinkComponent = defineComponent({
    props: {
        id: {
            type: Number,
            required: true
        }
    },
	setup(props) {
		const link: Ref<Link> = ref(getLink(props.id));
		const subscription = observeLink(props.id).subscribe(value => link.value = value);
        const candidate: Ref<Candidate | null> = ref(getCandidate());
        const subscription2 = observeCandidate().subscribe(value => candidate.value = value);
        onUnmounted(() => subscription.unsubscribe());
        onUnmounted(() => subscription2.unsubscribe());
		return { link, candidate, removeChainLink, commitCandidate, blockXEnd, blockYEnd };
	},
	render
});
