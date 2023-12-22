<script lang="ts">
	import Map from '$lib/components/map/Map.svelte';
</script>

<div class="flex h-screen w-screen">
	<div class="min-w-80 bg-slate-100 p-2">Sidebar</div>
	<div class="flex flex-1">
		<Map />
	</div>
</div>
