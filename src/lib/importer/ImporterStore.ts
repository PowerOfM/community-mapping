import type { IManagedCollection } from '$lib/types/types';
import { writable } from 'svelte/store';
import { mockRows } from './mockData';

export interface IInputData {
	parsedRows: string[][];
	collection: IManagedCollection;
}

const MAX_STEP_INDEX = 1;
const stepIndex = writable(1);
const inputData = writable<IInputData | null>({
	parsedRows: mockRows,
	collection: { id: '1', label: 'Test', isNew: true }
});

export const ImporterStore = {
	stepIndex,
	stepForward: () => stepIndex.update((n) => (n >= MAX_STEP_INDEX ? n : n + 1)),
	stepBackward: () => stepIndex.update((n) => (n > 0 ? n - 1 : 0)),

	inputData,

	reset: () => {
		stepIndex.set(1);
		// inputData.set(null);
	}
};
