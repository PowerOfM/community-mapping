<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';

	export let open = false;
	export let onOpenChange: (val: boolean) => void;
</script>

<Dialog.Root {open} {onOpenChange}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Import Data</Dialog.Title>
			<Dialog.Description>
				During this test, please copy-and-paste CSV data here.
			</Dialog.Description>
		</Dialog.Header>
		<div class="mt-3 grid w-full gap-1.5">
			<Label for="message">CSV Data</Label>
			<Textarea placeholder="Paste your data here." id="datainput" />
		</div>
		<Dialog.Footer>
			<Button type="submit">Process</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
