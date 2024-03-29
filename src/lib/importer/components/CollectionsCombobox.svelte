<script lang="ts">
	import { Check, CaretSort, Cross2 } from 'radix-icons-svelte';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils/shadcn';
	import { tick } from 'svelte';
	import type { IManagedCollection } from '$lib/DataTypes';

	export let collections: IManagedCollection[];
	export let value = '';
	export let id: string;

	let open = false;
	let searchValue = '';
	let selectedValue = '';
	$: selectedValue = collections.find((f) => f.id === value)?.label ?? 'Select a collection...';

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	function itemClick(triggerId: string, currentValue: string) {
		value = currentValue;
		closeAndFocusTrigger(triggerId);
	}

	function addCollection(triggerId: string) {
		if (!searchValue.length) return;

		const newId = 'id-' + collections.length;
		collections = [...collections, { id: newId, label: searchValue, tables: [], isNew: true }];
		value = newId;
		searchValue = '';
		closeAndFocusTrigger(triggerId);
	}
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild let:builder>
		<Button
			{id}
			builders={[builder]}
			variant="outline"
			role="combobox"
			aria-expanded={open}
			class="justify-between"
			style="width: calc(100% - 47px)"
		>
			{selectedValue}
			<CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto min-w-72 p-0">
		<Command.Root>
			<Command.Input
				autofocus
				placeholder="Search or create a collection..."
				bind:value={searchValue}
			/>

			<Command.Empty onClick={() => addCollection(ids.trigger)}>
				{#if searchValue.length}
					Add new collection "{searchValue}"
				{:else}
					Type to create a new collection
				{/if}
			</Command.Empty>

			<Command.Group>
				{#each collections as item, index}
					<Command.Item
						value={item.id}
						onSelect={(currentValue) => itemClick(ids.trigger, currentValue)}
						class="flex"
					>
						<Check class={cn('mr-2 h-4 w-4', value !== item.id && 'text-transparent')} />
						<span class="flex-1">{item.label}</span>
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
