<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { onMount } from 'svelte';
	import { builderStore } from '../ImporterStores';
	import { get } from 'svelte/store';

	export let onClose: () => void = () => {};
	let resultMsg = '';
	let errorMsgs: string[] = [];

	onMount(() => {
		const { result } = get(builderStore);
		if (!result) {
			resultMsg = 'Error: No data was loaded.';
			return;
		}

		resultMsg = `${result.records.length} records were imported with ${
			Object.keys(result.locations).length
		} unique addresses.`;
		if (result.errors?.length) {
			errorMsgs = result.errors.map((value) => `Row ${value.index + 1}: ${value.error}`);
		}
	});
</script>

<Dialog.Header>
	<Dialog.Title>Import Complete!</Dialog.Title>
</Dialog.Header>

<div class="mt-3 w-full">
	<p class="mb-5">{resultMsg}</p>
	{#if errorMsgs.length}
		<Label class="text-destructive">
			{errorMsgs.length} error{errorMsgs.length === 1 ? '' : 's'} occured:
		</Label>
		<Textarea readonly value={errorMsgs.join('\n')} />
		<p class="text-sm text-muted-foreground">
			You may be able to address some of these errors in the Table view.
		</p>
	{/if}
</div>

<Dialog.Footer>
	<Button type="button" on:click={onClose}>Done</Button>
</Dialog.Footer>
