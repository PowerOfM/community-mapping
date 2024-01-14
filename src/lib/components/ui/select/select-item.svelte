<script lang="ts">
	import { cn } from '$lib/utils/shadcn';
	import { Select as SelectPrimitive } from 'bits-ui';
	import { Check } from 'radix-icons-svelte';
	import { itemTWClasses } from './styling';

	type $$Props = SelectPrimitive.ItemProps;
	type $$Events = Required<SelectPrimitive.ItemEvents>;

	let className: $$Props['class'] = undefined;
	export let value: $$Props['value'];
	export let label: $$Props['label'] = undefined;
	export let disabled: $$Props['disabled'] = undefined;
	export { className as class };
</script>

<SelectPrimitive.Item
	{value}
	{disabled}
	{label}
	class={cn(itemTWClasses, className)}
	{...$$restProps}
	on:click
	on:pointermove
	on:focusin
>
	<span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
		<SelectPrimitive.ItemIndicator>
			<Check class="h-4 w-4" />
		</SelectPrimitive.ItemIndicator>
	</span>
	<slot />
</SelectPrimitive.Item>
