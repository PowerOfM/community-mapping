<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { ImporterStore } from './ImporterStore';
	import DefinitionStep from './Steps/DefinitionStep.svelte';
	import UploadStep from './Steps/UploadStep.svelte';

	export let open = false;
	$: if (open) ImporterStore.reset();

	let step = 0;
	ImporterStore.stepIndex.subscribe((value) => (step = value));

	let collections = [
		{ id: 'name1', label: 'Name 1' },
		{ id: 'name2', label: 'Name 2' },
		{ id: 'name3', label: 'Name 3' }
	];
</script>

<Dialog.Root {open} onOpenChange={(value) => (open = value)}>
	<Dialog.Content class="sm:max-w-[600px]">
		{#if step === 0}
			<UploadStep {collections} />
		{:else if step === 1}
			<DefinitionStep />
		{/if}
	</Dialog.Content>
</Dialog.Root>
