<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import CollectionCombobox from './CollectionsCombobox.svelte';

	export let open = false;
	export let onOpenChange: (val: boolean) => void;

	let collections = [
		{ id: 'name1', label: 'Name 1' },
		{ id: 'name2', label: 'Name 2' },
		{ id: 'name3', label: 'Name 3' }
	];
</script>

<Dialog.Root {open} {onOpenChange}>
	<Dialog.Content class="sm:max-w-[600px]">
		<Dialog.Header>
			<Dialog.Title>Import Data</Dialog.Title>
			<Dialog.Description>
				Only CSV files are supported. If you have an Excel or Numbers file, please use "Save As" and
				select the CSV format.
			</Dialog.Description>
		</Dialog.Header>
		<div class="mt-3 grid w-full gap-1.5">
			<Label for="csv-input">CSV File</Label>
			<Input id="csv-input" type="file" />
		</div>
		<div class="mt-3 grid w-full gap-1.5">
			<Label for="collection">Collection</Label>
			<CollectionCombobox bind:collections />
		</div>
		<Dialog.Footer>
			<Button type="submit">Process</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
