import { writable } from 'svelte/store';
import type { ICollection, ITable } from './DataTypes';

const mockCollections = [
	{
		id: 'id-0',
		label: 'Existing Test',
		tables: []
	}
];

export const collectionsStore = writable<ICollection[]>(mockCollections);

function addTable(collectionId: string, value: ITable) {
	collectionsStore.update((prev) => {
		const targetIndex = prev.findIndex((entry) => entry.id === collectionId);
		if (targetIndex < 0) {
			console.error('Could not find collection with ID:', collectionId, 'Creating new collection.');
			return [
				...prev,
				{
					id: crypto.randomUUID(),
					label: 'Orphaned Table',
					tables: [value]
				}
			];
		}

		const next = [...prev];
		const target = next[targetIndex];
		next[targetIndex] = { ...target, tables: [...target.tables, value] };
		return next;
	});
}

export const DataStore = {
	addTable
};
