<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { inputStyles } from '$lib/components/ui/input';
	import type { IManagedCollection } from '$lib/types/types';
	import { toast } from 'svelte-sonner';
	import CollectionCombobox from '../components/CollectionsCombobox.svelte';
	import { ImporterStore } from '../helpers/ImporterStore';
	import { CSVParser, type CVSParseResult } from '../helpers/CSVParser';
	import { withToast } from '$lib/utils';
	import DataPreviewTable from '../components/DataPreviewTable.svelte';

	let tableData: string[][] | undefined;
	ImporterStore.tableData.subscribe((value) => (tableData = value));

	let inputFiles: FileList | undefined;
	$: if (inputFiles?.length) {
		CSVParser.parse(inputFiles[0]).then((result) => {
			ImporterStore.tableData.set(result.data);
		});
	}

	async function handleNext() {
		if (!tableData) {
			toast.error('Please select a file');
			return;
		}
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

{#if !!tableData}
	<div class="mt-3 grid w-full gap-1.5">
		<Label>Preview</Label>
		<DataPreviewTable data={tableData} previewRows={5} />
		<p class="text-sm text-secondary">+{tableData.length - 5} lines</p>
	</div>
{/if}

<Dialog.Footer>
	{#if !!tableData}
		<Button type="button" variant="secondary" on:click={() => ImporterStore.reset()}>Clear</Button>
	{/if}

	<Button type="button" on:click={handleNext}>Next</Button>
</Dialog.Footer>
