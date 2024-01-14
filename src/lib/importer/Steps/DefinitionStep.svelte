<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { ExclamationTriangle } from 'radix-icons-svelte';
	import { ImporterStore, type IInputData } from '../ImporterStore';
	import FieldDefinitionInput from '../FieldDefinitionInput.svelte';

	let inputData: IInputData | null;
	ImporterStore.inputData.subscribe((data) => (inputData = data));

	interface IFieldDefinition {
		isComplex: boolean;
		complexValue: string;
		columnIndex?: number;
	}
	let addressField: IFieldDefinition = { isComplex: false, complexValue: '' };
	let labelField: IFieldDefinition = { isComplex: false, complexValue: '' };

	function handleNext() {}
	function handleBack() {
		ImporterStore.stepBackward();
	}
</script>

<Dialog.Header>
	<Dialog.Title>Define Columns</Dialog.Title>
	<Dialog.Description>
		To properly map the data, the system needs to know which column(s) correspond to a row's
		"address" and its "label". These can be a single column, or a combination of columns, but must
		be the same for all rows in the table.
	</Dialog.Description>
</Dialog.Header>

<div class="mt-3 grid w-full gap-4">
	{#if inputData == null || !inputData.parsedRows.length}
		<Alert.Root variant="destructive">
			<ExclamationTriangle class="h-4 w-4" />
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>No data was loaded. Please go back and try again.</Alert.Description>
		</Alert.Root>
	{:else}
		<div>
			<Label>Address Field</Label>
			<FieldDefinitionInput
				bind:isComplex={addressField.isComplex}
				bind:complexValue={addressField.complexValue}
				bind:columnIndex={addressField.columnIndex}
				options={inputData.parsedRows[0]}
			/>
		</div>
		<div>
			<Label>Label Field</Label>
			<FieldDefinitionInput
				bind:isComplex={labelField.isComplex}
				bind:complexValue={labelField.complexValue}
				bind:columnIndex={labelField.columnIndex}
				options={inputData.parsedRows[0]}
			/>
		</div>
	{/if}
</div>

<Dialog.Footer>
	<Button type="button" on:click={handleBack}>Back</Button>
	<Button type="button" on:click={handleNext}>Process</Button>
</Dialog.Footer>
