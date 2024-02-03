<script lang="ts">
	import * as Table from '$lib/components/ui/table';

	export let data: string[][] = [];
	export let previewRows = 5;

	let headers: string[] = data[0] ?? [];
	let rows: string[][] = data.slice(1, previewRows);
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			{#each headers as value}
				<Table.Head>{value}</Table.Head>
			{/each}
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each rows as row}
			<Table.Row>
				{#each row as value}
					<Table.Cell>{value}</Table.Cell>
				{/each}
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
