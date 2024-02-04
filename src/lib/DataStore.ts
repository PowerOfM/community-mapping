import { writable } from 'svelte/store';
import type { ICollection } from './DataTypes';

const mockCollections = [
	{
		id: 'id-0',
		label: 'Existing Test',
		tables: []
	}
];

class DataStoreClass {
	public readonly collections = writable<ICollection[]>(mockCollections);
}

export const DataStore = new DataStoreClass();
