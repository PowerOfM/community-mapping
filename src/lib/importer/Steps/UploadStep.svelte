<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { inputStyles } from '$lib/components/ui/input';
	import type { IManagedCollection } from '$lib/types/types';
	import { toast } from 'svelte-sonner';
	import CollectionCombobox from '../CollectionsCombobox.svelte';
	import { ImporterStore } from '../ImporterStore';
	import { CSVParser } from '../CSVParser';
	import { withToast } from '$lib/utils';

	export let collections: IManagedCollection[];

	let inputFiles: FileList | undefined;
	let selectedCollectionId: string | undefined;

	async function handleNext() {
		if (!inputFiles?.length) {
			toast.error('Please select a file');
			return;
		}
		const selectedCollection = collections.find((c) => c.id === selectedCollectionId);
		if (!selectedCollection) {
			toast.error('Please select or create a collection for this table');
			return;
		}

		const result = await withToast(CSVParser.parse(inputFiles[0]), {
			loading: 'Processing file...',
			success: (result) => `${result.data.length} rows imported`
		});
		console.log('result', result);

		ImporterStore.inputData.set({
			parsedRows: result.data,
			collection: selectedCollection
		});
		ImporterStore.stepForward();
	}
</script>

<Dialog.Header>
	<Dialog.Title>Import Data</Dialog.Title>
	<Dialog.Description>
		Only CSV files are supported. If you have an Excel or Numbers file, please save it as the CSV
		format.
	</Dialog.Description>
</Dialog.Header>

<div class="mt-3 grid w-full gap-1.5">
	<Label for="importer-csv-fle">CSV File</Label>
	<input id="importer-csv-fle" class={inputStyles} type="file" bind:files={inputFiles} />
</div>

<div class="mt-3 grid w-full gap-1.5">
	<Label for="importer-collection-combobox">Collection</Label>
	<CollectionCombobox
		id="importer-collection-combobox"
		bind:collections
		bind:value={selectedCollectionId}
	/>
</div>

<Dialog.Footer>
	<Button type="button" on:click={handleNext}>Next</Button>
</Dialog.Footer>
