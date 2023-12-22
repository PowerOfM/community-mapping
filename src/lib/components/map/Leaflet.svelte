<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte';
	import * as L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	export let height = '100%';
	export let width = '100%';
	export let bounds: L.LatLngBounds;
	let mapProp: L.Map | undefined = undefined;
	export { mapProp as map };

	export const invalidateSize = () => map?.invalidateSize();

	const dispatch = createEventDispatcher();

	let map: L.Map | undefined;
	$: mapProp = map;

	export const getMap = () => map;
	setContext('layerGroup', getMap);
	setContext('layer', getMap);
	setContext('map', getMap);

	const initialView: L.LatLngTuple = [39.8283, -98.5795];
	function createLeaflet(node: HTMLElement) {
		console.log('creating leaflet on', node);
		map = L.map(node, { preferCanvas: true });
		map.setView(initialView, 5);
		// .fitBounds(bounds)
		// .on('zoom', (e) => dispatch('zoom', e));
		setTimeout(() => {
			if (map) {
				map.invalidateSize();
				map.fitBounds(bounds);
			}
		}, 250);

		L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
			attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
            &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
			subdomains: 'abcd',
			maxZoom: 14
		}).addTo(map);

		return {
			destroy() {
				map!.remove();
				map = undefined;
			}
		};
	}

	$: map?.fitBounds(bounds);
</script>

<div class="flex-1" use:createLeaflet>
	{#if map}
		<slot {map} />
	{/if}
</div>

<style>
	:global(.leaflet-control-container) {
		position: static;
	}
</style>
