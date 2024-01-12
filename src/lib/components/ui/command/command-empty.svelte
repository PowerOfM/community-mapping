<script lang="ts">
	import { Command as CommandPrimitive } from 'cmdk-sv';
	import { cn } from '$lib/utils';

	type $$Props = CommandPrimitive.EmptyProps & { onClick: () => void };

	let className: string | undefined | null = undefined;
	export { className as class };
	export let onClick: () => void;
</script>

<CommandPrimitive.Empty {...$$restProps} class="text-center">
	<button class={cn('w-auto px-4 py-3 text-center text-sm', className)} on:click={onClick}>
		<slot />
	</button>
</CommandPrimitive.Empty>
