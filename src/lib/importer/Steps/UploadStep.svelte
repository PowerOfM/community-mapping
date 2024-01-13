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
		if (!selectedCollectionId) {
			toast.error('Please select or create a collection for this table');
			return;
		}

		const data = await withToast(CSVParser.parse(inputFiles[0]), {
			loading: 'Processing file...',
			success: (result) => `${result.data.length} rows imported`
		});
		console.log('data', data);
		// TODO: set store

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
	<Label for="csv-input">CSV File</Label>
	<input id="csv-input" class={inputStyles} type="file" bind:files={inputFiles} />
</div>

<div class="mt-3 grid w-full gap-1.5">
	<Label for="collection">Collection</Label>
	<CollectionCombobox bind:collections bind:value={selectedCollectionId} />
</div>

<Dialog.Footer>
	<Button type="button" on:click={handleNext}>Next</Button>
</Dialog.Footer>
