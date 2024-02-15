import { writable } from 'svelte/store';

export const selectedCollectionIdStore = writable<string | undefined>(undefined);
export const selectedTableIdStore = writable<string | undefined>(undefined);
