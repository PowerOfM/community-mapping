<script lang="ts">
	import { inputStyles } from '$lib/components/ui/input';
	import { contentStyles, itemStyles } from '$lib/components/ui/select';
	import { cn } from '$lib/utils';

	export let options: string[];
	export let value: string = '';

	let input: HTMLInputElement;
	let filteredOptions = options;
	let filteredHilightI = -1;

	let focused = false;
	let inBrace = false;
	let braceStartI = 0;

	$: if (inBrace) {
		if (!value.length || value.length < braceStartI || value[value.length - 1] === '}') {
			inBrace = false;
		} else {
			let queryTerm = value.substring(braceStartI + 1).toLocaleLowerCase();
			filteredOptions = options.filter((value) => value.toLocaleLowerCase().includes(queryTerm));
			if (filteredHilightI >= filteredOptions.length) {
				filteredHilightI = 0;
			}
		}
	} else {
		if (value[value.length - 1] === '{') {
			inBrace = true;
			braceStartI = value.length - 1;
			filteredOptions = options;
			filteredHilightI = 0;
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		// Navigation
		if (e.key === 'ArrowDown') {
			filteredHilightI = filteredHilightI + (1 % filteredOptions.length);
		} else if (e.key === 'ArrowUp') {
			if (filteredHilightI === 0) filteredHilightI = filteredOptions.length - 1;
			else filteredHilightI--;

			//Submit
		} else if (e.key === 'Enter') {
			insertSelection(filteredHilightI);
		}
	}
	function insertSelection(index: number) {
		if (!inBrace) return;
		value = value.substring(0, braceStartI) + '{' + filteredOptions[index] + '}';
		inBrace = false;
		input.focus();
	}
</script>

<input
	class={cn(inputStyles, 'flex-1')}
	bind:this={input}
	bind:value
	on:keydown={handleKeyDown}
	on:focus={() => (focused = true)}
	on:blur={() => (focused = false)}
/>

{#if focused && inBrace}
	<div class={cn(contentStyles, 'absolute top-8')}>
		{#each filteredOptions as value, i}
			<div class={cn(itemStyles, filteredHilightI === i && 'bg-muted/50')}>{value}</div>
		{/each}
	</div>
{/if}
