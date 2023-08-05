import { Ref, ref, defineComponent } from "vue";
import { render } from "./template";
import { Connector } from "../connector";
import { getConnector } from "../get-connector";
import { observeConnector } from "../observe-connector";
import { blockXEnd, blockYEnd } from "../block";
import { observeCandidate } from "../observe-candidate";
import { isConnectorSelected } from "../is-connector-selected";
import { getCandidate } from "../get-candidate";
import { selectConnector } from "../puzzle-state";

export const ConnectorComponent = defineComponent({
    props: {
        id: {
            type: Number,
            required: true
        }
    },
	setup(props) {
		const connector: Ref<Connector> = ref(getConnector(props.id));
        const connectorIsSelected: Ref<boolean> = ref(isConnectorSelected(connector.value, getCandidate()));
		observeConnector(props.id).subscribe(value => connector.value = value);
        observeCandidate().subscribe(candidate => connectorIsSelected.value = isConnectorSelected(connector.value, candidate));
		return { connector, connectorIsSelected, blockXEnd, blockYEnd, selectConnector };
	},
	render
});
