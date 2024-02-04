<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { get } from 'svelte/store';
	import { dialogStateStore, ImportStoreControl } from './ImporterStores';
	import DefinitionStep from './steps/DefinitionStep.svelte';
	import ProcessStep from './steps/ProcessStep.svelte';
	import UploadStep from './steps/UploadStep.svelte';

	export let open = false;
	$: if (open) ImportStoreControl.reset();

	let step = $dialogStateStore.step;
</script>

<Dialog.Root
	{open}
	onOpenChange={(value) => (open = value)}
	closeOnEscape={false}
	closeOnOutsideClick={false}
>
	<Dialog.Content class="sm:max-w-[600px]" closeable={$dialogStateStore.closeable}>
		{#if step === 0}
			<UploadStep />
		{:else if step === 1}
			<DefinitionStep />
		{:else if step === 2}
			<ProcessStep />
		{/if}
	</Dialog.Content>
</Dialog.Root>
