import type { IManagedCollection } from '$lib/types/types';
import { writable } from 'svelte/store';
import { mockRows } from '../mockData';
import type { FieldDefinition, IFieldInputDefinition } from './FieldDefinitionParser';

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

	public readonly collection = writable<IManagedCollection | undefined>({
		id: 'id-0',
		label: 'Test',
		isNew: true
	});

	public readonly addressInputField = writable<IFieldInputDefinition>({
		isComplex: true,
		complexValue: '{Address Line 1}, {City}, {Prov} {Postal}, Canada'
	});
	public readonly labelInputField = writable<IFieldInputDefinition>({
		isComplex: false,
		complexValue: '',
		columnIndex: 13
	});

	public readonly addressField = writable<FieldDefinition>([9, ', ', 10, ', ', 11, ' ', 12]);
	public readonly labelField = writable<FieldDefinition>([13]);

	public reset() {
		this.stepIndex.set(1);
	}
}

export const ImporterStore = new ImporterStoreClass();
