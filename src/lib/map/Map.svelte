<script lang="ts">
	import * as L from 'leaflet';
	import Leaflet from './Leaflet.svelte';

	const initialBounds = L.latLngBounds([24, -126], [50, -66]);

	let loaded = false;
	let map: Leaflet;

	function resizeMap() {
		if (map) {
			map.invalidateSize();
		}
	}
</script>

<svelte:window on:resize={resizeMap} on:load={() => (loaded = true)} />

<!-- Show the map only once the window has loaded, so that Leaflet gets the sizing right. -->
{#if loaded || document.readyState === 'complete'}
	<Leaflet bind:this={map} bounds={initialBounds}>
		<!-- <MapControls
					{initialBounds}
					{msas}
					{infoMsa}
					bind:showLines
					bind:topNFlows
					bind:filterSetting
				/>
				{#each allShownMsas as msa (msa.id)}
					<GeoJson
						geojson={msa.feature}
						fillOpacity={0.6}
						fillColor={netToColor(msa[countField])}
						weight={hasLines.has(msa.id) ? 2 : 0}
						color="black"
						on:click={() => (clickMsa = msa)}
						on:mouseover={() => {
							hoverMsa = msa;
							hoveringInList = false;
						}}
						on:mouseout={() => {
							if (hoverMsa === msa) {
								hoverMsa = undefined;
							}
						}}
					/>
				{/each}

				<Pane name="linePane" z={450}>
					{#if showLines}
						{#each lines as line}
							<Curve
								path={line.path}
								color={line.color}
								className="animate-dash-offset"
								dashArray="8 10"
								style="--animation-speed:{line.animationSpeed}"
								interactive={false}
							/>
						{/each}
					{/if}
				</Pane> -->
	</Leaflet>
{/if}

<!-- <div style="grid-area:controls" class="flex w-full justify-between text-sm md:px-12">
		{#if listMsa}
			<div class="overflow-x-hidden px-2">
				<p class="font-medium text-gray-800">Top Sources</p>
				{#each listMsa.incoming.slice(0, 10) as msa}
					<p
						class="flex cursor-pointer hover:bg-gray-100"
						on:click={() => (clickMsa = msas.get(msa.id))}
						on:mouseover={() => {
							hoverMsa = msas.get(msa.id);
							hoveringInList = true;
						}}
						on:mouseout={() => (hoverMsa = null)}
					>
						<span class="truncate">{msas.get(msa.id).name}</span>
						<span class="whitespace-no-wrap">: {msa.count}</span>
					</p>
				{/each}
			</div>

			<div class="overflow-x-hidden px-2">
				<p class="font-medium text-gray-800">Top Destinations</p>
				{#each listMsa.outgoing.slice(0, 10) as msa}
					<p
						class="flex cursor-pointer hover:bg-gray-100"
						on:mouseover={() => {
							hoverMsa = msas.get(msa.id);
							hoveringInList = true;
						}}
						on:mouseout={() => (hoverMsa = null)}
						on:click={() => (clickMsa = msas.get(msa.id))}
					>
						<span class="truncate">{msas.get(msa.id).name}</span>
						<span class="whitespace-no-wrap">: {msa.count}</span>
					</p>
				{/each}
			</div>
		{/if}
	</div> -->
