<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { ExclamationTriangle } from 'radix-icons-svelte';
	import {
		ImportStoreControl,
		addressInputFieldStore,
		definitionStore,
		labelInputFieldStore,
		tableDataStore
	} from '../ImporterStores';
	import FieldDefinitionInput from '../components/FieldDefinitionInput.svelte';
	import CollectionsCombobox from '../components/CollectionsCombobox.svelte';
	import type { IManagedCollection } from '$lib/DataTypes';
	import { FieldDefinitionParser } from '../helpers/FieldDefinitionParser';
	import { cn } from '$lib/utils';
	import { collectionsStore } from '$lib/DataStore';
	import { get } from 'svelte/store';

	// Don't subscribe as we want to manipulate the array
	let collections: IManagedCollection[] = get(collectionsStore);

	let selectedCollectionId = $definitionStore.collection?.id;
	let selectedCollectionError: string | undefined;

	let tableData: string[][] = $tableDataStore;

	let addressError: string | undefined;
	let labelError: string | undefined;

	function handleNext() {
		// Validate
		const selectedCollection = collections.find((c) => c.id === selectedCollectionId);
		if (!selectedCollection) {
			selectedCollectionError = 'Please select or create a collection for this table.';
		}
		const addressField = FieldDefinitionParser.parse(get(addressInputFieldStore), tableData[0]);
		if (!addressField) {
			addressError = 'Invalid input. Please check the console for more information.';
		}
		const labelField = FieldDefinitionParser.parse(get(labelInputFieldStore), tableData[0]);
		if (!labelField) {
			labelError = 'Invalid input. Please check the console for more information.';
		}
		if (!selectedCollection || !addressField || !labelField) return;

		// Update store
		definitionStore.set({
			collection: selectedCollection,
			addressField,
			labelField
		});

		// Start processing
		ImportStoreControl.runProcessor();
		ImportStoreControl.stepForward();
	}
	function handleBack() {
		ImportStoreControl.stepBackward();
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
			<p
				class={cn(
					'text-[0.8rem]',
					selectedCollectionError ? 'text-destructive' : 'text-muted-foreground'
				)}
			>
				{selectedCollectionError ?? 'Choose or create a collection to store this data'}
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
				bind:isComplex={$addressInputFieldStore.isComplex}
				bind:complexValue={$addressInputFieldStore.complexValue}
				bind:columnIndex={$addressInputFieldStore.columnIndex}
				options={tableData[0]}
				error={addressError}
			/>
		</div>
		<div>
			<Label>Label Field</Label>
			<FieldDefinitionInput
				bind:isComplex={$labelInputFieldStore.isComplex}
				bind:complexValue={$labelInputFieldStore.complexValue}
				bind:columnIndex={$labelInputFieldStore.columnIndex}
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
