<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { Stack } from 'radix-icons-svelte';
	import { Toggle } from '$lib/components/ui/toggle';
	import { Input } from '$lib/components/ui/input';
	import { cn } from '$lib/utils';
	import CodeAutocomplete from './CodeAutocomplete.svelte';
	import type { IFieldInputDefinition } from '../helpers/FieldDefinitionParser';

	export let options: string[];
	export let isComplex: boolean;
	export let complexValue: string = '';
	export let columnIndex: number | undefined = undefined;
	export let error: string | undefined = undefined;

	$: toggleLabel = isComplex
		? 'Switch back to basic column select'
		: 'Switch to combined column mode';
	$: hintLabel = isComplex
		? 'Use { and } to reference columns by name (ex: {Postal Code}) or [ and ] to reference by number (ex: [4]).'
		: 'Choose a column from the dropdown or use complex mode to join multiple columns together.';

	function handeSelectedChange(selected?: { value: number }) {
		columnIndex = Number(selected?.value) ?? undefined;
	}
</script>

<div class="flex">
	{#if isComplex}
		<div class="relative flex w-full">
			<CodeAutocomplete bind:value={complexValue} {options} />
		</div>
	{:else}
		<Select.Root
			selected={columnIndex ? { value: columnIndex, label: options[columnIndex] } : undefined}
			onSelectedChange={handeSelectedChange}
		>
			<Select.Trigger class="w-full">
				<Select.Value placeholder="Select a column" />
			</Select.Trigger>
			<Select.Content>
				{#each options as value, i}
					<Select.Item value={i}>{value}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	{/if}

	<Toggle class="ml-2" bind:pressed={isComplex} aria-label={toggleLabel} title={toggleLabel}>
		<Stack />
	</Toggle>
</div>

<p class={cn('text-[0.8rem]', error ? 'text-destructive' : 'text-muted-foreground')}>
	{error ?? hintLabel}
</p>
