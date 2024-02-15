<script lang="ts">
	import Map from '$lib/map/Map.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import ImporterDialog from '$lib/importer/ImporterDialog.svelte';
	import { collectionsStore } from '$lib/DataStore';
	import Table from '$lib/table/DataTable.svelte';
	import { Toggle } from '$lib/components/ui/toggle';
	import TableOverlay from '$lib/table/Table.svelte';

	enum PageTab {
		Map,
		Table
	}

	let importerOpen = false;
	let collections = $collectionsStore;

	let selectedTab: PageTab = PageTab.Map;
</script>

<ImporterDialog bind:open={importerOpen} />

<div class="flex h-screen w-screen">
	<div class="bg-primary0 min-w-80 p-2">
		<div class="border-b-1 mb-5">
			<Toggle
				variant="outline"
				aria-label="Show Map"
				pressed={selectedTab === PageTab.Map}
				onPressedChange={() => (selectedTab = PageTab.Map)}
			>
				Map
			</Toggle>
			<Toggle
				variant="outline"
				aria-label="Show Table"
				pressed={selectedTab === PageTab.Table}
				onPressedChange={() => (selectedTab = PageTab.Table)}
			>
				Table
			</Toggle>
			<Button variant="outline" on:click={() => (importerOpen = true)}>Import</Button>
		</div>

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

	<div class="relative flex flex-1">
		<Map />

		<TableOverlay show={selectedTab === PageTab.Table}>
			<Table />
		</TableOverlay>
	</div>
</div>
