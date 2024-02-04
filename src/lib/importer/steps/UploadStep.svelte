<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { inputStyles } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { ImportStoreControl, tableDataStore } from '../ImporterStores';
	import { CSVParser } from '../helpers/CSVParser';
	import DataPreviewTable from '../components/DataPreviewTable.svelte';

	let tableData = $tableDataStore;

	let inputFiles: FileList | undefined;
	$: if (inputFiles?.length) {
		CSVParser.parse(inputFiles[0]).then((result) => {
			$tableDataStore = result.data;
		});
	}

	async function handleNext() {
		if (!tableData) {
			toast.error('Please select a file');
			return;
		}
		ImportStoreControl.stepForward();
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
		<Button type="button" variant="secondary" on:click={() => ImportStoreControl.reset()}
			>Clear</Button
		>
	{/if}

	<Button type="button" on:click={handleNext}>Next</Button>
</Dialog.Footer>
