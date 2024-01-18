<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { ExclamationTriangle } from 'radix-icons-svelte';
	import { ImporterStore } from '../ImporterStore';
	import FieldDefinitionInput from '../FieldDefinitionInput.svelte';
	import CollectionsCombobox from '../CollectionsCombobox.svelte';
	import type { IManagedCollection } from '$lib/types/types';
	import type { IFieldInputDefinition } from '../FieldDefinitionParser';
	import { FieldDefinitionParser } from '../FieldDefinitionParser';

	let collections: IManagedCollection[] = [];
	let selectedCollectionId: string | undefined;

	let tableData: string[][] = [];
	ImporterStore.tableData.subscribe((data) => (tableData = data));

	let addressField: IFieldInputDefinition = { isComplex: false, complexValue: '' };
	let addressError: string | undefined;
	let labelField: IFieldInputDefinition = { isComplex: false, complexValue: '' };
	let labelError: string | undefined;

	function handleNext() {
		const addressParsed = FieldDefinitionParser.parse(addressField, tableData[0]);
		if (!addressParsed) {
			addressError = 'Invalid input. Please check the console for more information.';
			return;
		}
		const labelParsed = FieldDefinitionParser.parse(labelField, tableData[0]);
		if (!labelParsed) {
			labelError = 'Invalid input. Please check the console for more information.';
			return;
		}

		// TODO: set the store
	}
	function handleBack() {
		ImporterStore.stepBackward();
	}
</script>

<Dialog.Header>
	<Dialog.Title>Organize Data</Dialog.Title>
</Dialog.Header>

<div class="mt-3 grid w-full gap-4">
	{#if !tableData.length}
		<Alert.Root variant="destructive">
			<ExclamationTriangle class="h-4 w-4" />
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>No data was loaded. Please go back and try again.</Alert.Description>
		</Alert.Root>
	{:else}
		<div>
			<Label for="importer-collection-combobox">Collection</Label>
			<CollectionsCombobox
				id="importer-collection-combobox"
				bind:collections
				bind:value={selectedCollectionId}
			/>
			<p class="text-[0.8rem] text-muted-foreground">
				Choose or create a collection to store this data
			</p>
		</div>

		<p class="text-sm text-muted-foreground">
			To properly map the data, the system needs to know which column(s) correspond to a row's
			"address" and its "label". These can be a single column, or a combination of columns, but must
			be the same for all rows in the table.
		</p>

		<div>
			<Label>Address Field</Label>
			<FieldDefinitionInput
				bind:isComplex={addressField.isComplex}
				bind:complexValue={addressField.complexValue}
				bind:columnIndex={addressField.columnIndex}
				options={tableData[0]}
				error={addressError}
			/>
		</div>
		<div>
			<Label>Label Field</Label>
			<FieldDefinitionInput
				bind:isComplex={labelField.isComplex}
				bind:complexValue={labelField.complexValue}
				bind:columnIndex={labelField.columnIndex}
				options={tableData[0]}
				error={labelError}
			/>
		</div>
	{/if}
</div>

<Dialog.Footer>
	<Button type="button" on:click={handleBack}>Back</Button>
	<Button type="button" on:click={handleNext}>Process</Button>
</Dialog.Footer>
