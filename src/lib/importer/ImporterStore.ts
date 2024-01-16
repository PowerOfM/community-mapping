import type { IManagedCollection } from '$lib/types/types';
import { writable } from 'svelte/store';
import { mockRows } from './mockData';

const MAX_STEP_INDEX = 3;

class ImporterStoreClass {
	public readonly stepIndex = writable(1);

	public stepForward() {
		this.stepIndex.update((n) => (n >= MAX_STEP_INDEX ? n : n + 1));
	}
	public stepBackward() {
		this.stepIndex.update((n) => (n > 0 ? n - 1 : 0));
	}

	public readonly tableData = writable<string[][]>(mockRows);
	public readonly collection = writable<IManagedCollection | undefined>();

	public reset() {
		this.stepIndex.set(1);
	}
}

export const ImporterStore = new ImporterStoreClass();
