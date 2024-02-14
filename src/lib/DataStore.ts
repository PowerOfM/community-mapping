import { writable } from 'svelte/store';
import type { ICollection, ITable } from './DataTypes';
import { StoreManager } from './utils/StoreManager';
import { LoggerBuilder } from './utils/Logger';

const log = LoggerBuilder.build('DataStore');
const mockCollections = [
	{
		id: 'id-0',
		label: 'Existing Test',
		tables: []
	}
];

export const collectionsStore = writable<ICollection[]>(mockCollections);
export const collectionsManagedStore = new StoreManager(collectionsStore, 'collections');

function addTable(collectionId: string, value: ITable) {
	collectionsStore.update((prev) => {
		const targetIndex = prev.findIndex((entry) => entry.id === collectionId);
		if (targetIndex < 0) {
			log.warn('Could not find collection with ID:', collectionId, 'Creating new collection.');
			return [
				...prev,
				{
					id: crypto.randomUUID(),
					label: 'OrphanedOrphaned Table',
					tables: [value]
				}
			];
		}

		const next = [...prev];
		const target = next[targetIndex];
		if (value.label === 'Table') {
			value.label += ' ' + (target.tables.length + 1);
		}

		next[targetIndex] = { ...target, tables: [...target.tables, value] };
		log('Add table result', next);
		return next;
	});
}

export const DataStore = {
	addTable
};
