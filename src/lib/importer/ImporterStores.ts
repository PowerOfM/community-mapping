import type { FieldDefinition, IManagedCollection, ITable } from '$lib/DataTypes';
import { get, writable } from 'svelte/store';
import { mockRows } from './mockData';
import type { IFieldInputDefinition } from './helpers/FieldDefinitionParser';
import { TableBuilder } from './helpers/TableBuilder';
import { DataStore } from '$lib/DataStore';

const MAX_STEP_INDEX = 3;
const DEFAULT_FIELD_INPUT: IFieldInputDefinition = {
	isComplex: false,
	complexValue: '',
	columnIndex: undefined
};

// Writable Stores
export const dialogStateStore = writable({
	step: 0,
	closeable: true
});

export const addressInputFieldStore = writable<IFieldInputDefinition>(DEFAULT_FIELD_INPUT);
export const labelInputFieldStore = writable<IFieldInputDefinition>(DEFAULT_FIELD_INPUT);

export const tableDataStore = writable<string[][]>([]);
export const definitionStore = writable({
	collection: undefined as IManagedCollection | undefined,
	addressField: [] as FieldDefinition,
	labelField: [] as FieldDefinition
});

export const builderStore = writable({
	abortController: new AbortController(),
	progress: 0,
	result: undefined as ITable | undefined
});

// Store Helpers
function stepForward(closeable = true) {
	dialogStateStore.update((prev) => ({
		step: prev.step >= MAX_STEP_INDEX ? prev.step : prev.step + 1,
		closeable
	}));
}

function stepBackward(closeable = true) {
	dialogStateStore.update((prev) => ({
		step: prev.step > 0 ? prev.step - 1 : 0,
		closeable
	}));
}

async function runProcessor() {
	const abortController = new AbortController();
	const collectionId = get(definitionStore).collection?.id || 'UNSET_COLLECTION_ID';

	builderStore.set({
		abortController,
		progress: 0,
		result: undefined
	});

	const tableDefinitionData = get(definitionStore);
	const tableBuilder = new TableBuilder(
		tableDefinitionData.addressField,
		tableDefinitionData.labelField,
		abortController.signal
	);

	tableBuilder.onStep((value) => {
		builderStore.set({
			abortController,
			progress: value,
			result: undefined
		});
	});

	const tableDataData = get(tableDataStore);
	const result = await tableBuilder.build(tableDataData);
	DataStore.addTable(collectionId, result);

	builderStore.set({
		abortController,
		progress: 100,
		result
	});
	stepForward();
}

function reset() {
	dialogStateStore.set({ step: 0, closeable: true });

	tableDataStore.set(mockRows);

	addressInputFieldStore.set({
		isComplex: true,
		complexValue: '{Address Line 1}, {City}, {Prov} {Postal}, Canada'
	});
	labelInputFieldStore.set({
		isComplex: false,
		complexValue: '',
		columnIndex: 13
	});

	definitionStore.set({
		collection: undefined,
		addressField: [],
		labelField: []
	});

	builderStore.set({
		abortController: new AbortController(),
		progress: 0,
		result: undefined
	});
}

export const ImportStoreControl = {
	stepForward,
	stepBackward,
	runProcessor,
	reset
};
