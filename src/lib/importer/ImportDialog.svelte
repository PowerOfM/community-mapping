<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { ImporterStore } from './helpers/ImporterStore';
	import DefinitionStep from './steps/DefinitionStep.svelte';
	import ProcessStep from './steps/ProcessStep.svelte';
	import UploadStep from './steps/UploadStep.svelte';

	export let open = false;
	$: if (open) ImporterStore.reset();

	let step = 0;
	ImporterStore.stepIndex.subscribe((value) => (step = value));
</script>

<Dialog.Root {open} onOpenChange={(value) => (open = value)}>
	<Dialog.Content class="sm:max-w-[600px]">
		{#if step === 0}
			<UploadStep />
		{:else if step === 1}
			<DefinitionStep />
		{:else if step === 2}
			<ProcessStep />
		{/if}
	</Dialog.Content>
</Dialog.Root>
