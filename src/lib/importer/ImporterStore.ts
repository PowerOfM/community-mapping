import { writable } from 'svelte/store';

const MAX_STEP_INDEX = 1;
const stepIndex = writable(0);

export const ImporterStore = {
	stepIndex,
	stepForward: () => stepIndex.update((n) => (n >= MAX_STEP_INDEX ? n : n + 1)),
	stepBackward: () => stepIndex.update((n) => (n > 0 ? n - 1 : 0)),

	reset: () => {
		stepIndex.set(0);
	}
};
