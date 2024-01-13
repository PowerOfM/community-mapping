<script lang="ts">
	import Map from '$lib/map/Map.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import ImportDialog from '$lib/importer/ImportDialog.svelte';

	let importerOpen = true;
</script>

<ImportDialog bind:open={importerOpen} />
<div class="flex h-screen w-screen">
	<div class="bg-primary0 min-w-80 p-2">
		<div>
			<Button variant="secondary">Map</Button>
			<Button variant="outline">Table</Button>
			<Button variant="outline" on:click={() => (importerOpen = true)}>Import</Button>
		</div>
		<hr class="mb-2 mt-3" />
		Collections:
		<br />
		Main
		<ul class="list-disc pl-5">
			<li>Table 1</li>
		</ul>
	</div>
	<div class="flex flex-1">
		<Map />
	</div>
</div>
