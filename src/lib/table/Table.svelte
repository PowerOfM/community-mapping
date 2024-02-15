<script lang="ts">
	import { collectionsStore } from '$lib/DataStore';
import type { ITable } from '$lib/DataTypes';
import { selectedCollectionIdStore, selectedTableIdStore } from '$lib/SelectionStore';
	import DataTable from './DataTable.svelte';
	import TableOverlay from './TableOverlay.svelte';

	export let show = false;

	const collectionId = $selectedCollectionIdStore;
	const tableId = $selectedTableIdStore;

	const table: ITable | undefined;
	
</script>

<TableOverlay {show}>
	{}
</TableOverlay>
