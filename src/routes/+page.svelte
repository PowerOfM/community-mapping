<script lang="ts">
	import Map from '$lib/map/Map.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import ImporterDialog from '$lib/importer/ImporterDialog.svelte';
	import { collectionsStore } from '$lib/DataStore';

	let importerOpen = false;
	let collections = $collectionsStore;
</script>

<ImporterDialog bind:open={importerOpen} />
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
		{#each collections as collection}
			{collection.label}
			{#each collection.tables as table}
				<ul class="list-disc pl-5">
					<li>{table.label}</li>
				</ul>
			{/each}
		{/each}
	</div>
	<div class="flex flex-1">
		<Map />
	</div>
</div>
