<script lang="ts">
	import * as L from 'leaflet';
	import { getContext, onDestroy } from 'svelte';

	// 'map' is set by the parent Leaflet component, and returns the
	// Leaflet map instance.
	const map = getContext('map');

	export let latLngs;
	export let color;

	// Create the line when the component inits
	export let line: L.Polyline = new L.Polyline(latLngs, { color }).addTo(map);

	// And remove when destroyed
	onDestroy(() => line.remove());

	// Update style properties
	$: style = { color };
	// Update line when style changes
	$: line.setStyle(style);

	// Move the line as needed
	$: {
		line.setLatLngs(latLngs);
		line.redraw();
	}
</script>

<slot />
