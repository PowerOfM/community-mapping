<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Progress } from '$lib/components/ui/progress';
	import { onMount } from 'svelte';
	import { builderStore } from '../ImporterStores';

	let value = $builderStore.progress;

	onMount(() => {
		const timer = setInterval(() => (value = (value + 1) % 100), 500);
		return () => clearInterval(timer);
	});
</script>

<Dialog.Header>
	<Dialog.Title>Processing...</Dialog.Title>
</Dialog.Header>

<div class="mt-3 w-full">
	<Progress {value} max={100} />
</div>
