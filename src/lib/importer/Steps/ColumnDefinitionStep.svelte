<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';

	function handleNext() {}
</script>

<Dialog.Header>
	<Dialog.Title>Define Columns</Dialog.Title>
	<Dialog.Description>
		Select which columns represent the main name and address for this spreadsheet.
	</Dialog.Description>
</Dialog.Header>
<div class="mt-3 grid w-full gap-1.5"></div>
<Dialog.Footer>
	<Button type="button" on:click={handleNext}>Process</Button>
</Dialog.Footer>
