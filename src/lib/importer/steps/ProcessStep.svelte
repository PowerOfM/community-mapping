<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Progress } from '$lib/components/ui/progress';
	import { builderStore } from '../ImporterStores';

	let value = 0;
	builderStore.subscribe((store) => (value = store.progress));
</script>

<Dialog.Header>
	<Dialog.Title>Processing...</Dialog.Title>
</Dialog.Header>

<div class="mt-3 w-full">
	<Progress {value} max={100} />
</div>
