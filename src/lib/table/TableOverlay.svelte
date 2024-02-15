<script lang="ts">
	export let show = false;
</script>

{#if show}
	<div class="absolute bottom-0 left-0 right-0 top-0 z-[1000] bg-background">
		<slot />
	</div>
{/if}
