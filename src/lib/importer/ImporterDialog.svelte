<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { dialogStateStore, ImportStoreControl } from './ImporterStores';
	import DefinitionStep from './steps/DefinitionStep.svelte';
	import ProcessStep from './steps/ProcessStep.svelte';
	import UploadStep from './steps/UploadStep.svelte';
	import CompleteStep from './steps/CompleteStep.svelte';

	export let open = false;
	$: if (open) ImportStoreControl.reset();

	let step = 0;
	let closeable = true;
	dialogStateStore.subscribe((store) => {
		step = store.step;
		closeable = store.closeable;
	});
</script>

<Dialog.Root
	{open}
	onOpenChange={(value) => (open = value)}
	closeOnEscape={false}
	closeOnOutsideClick={false}
>
	<Dialog.Content class="sm:max-w-[600px]" {closeable}>
		{#if step === 0}
			<UploadStep />
		{:else if step === 1}
			<DefinitionStep />
		{:else if step === 2}
			<ProcessStep />
		{:else if step === 3}
			<CompleteStep onClose={() => (open = false)} />
		{/if}
	</Dialog.Content>
</Dialog.Root>
