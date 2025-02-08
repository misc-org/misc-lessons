<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	let terms: { title: string; description: string }[] = $state([]);

	const termCache = new Map();

	const getTerms = async (docId: string) => {
		if (termCache.has(docId)) {
			return termCache.get(docId);
		}

		const terms = import.meta.glob('/src/lib/docs/**/terms/index.json', {
			eager: true,
			import: 'default'
		});

		const termPath = `/src/lib/docs/${docId}/terms/index.json`;
		const termData = terms[termPath] || [];

		termCache.set(docId, termData);
		return termData;
	};

	onMount(async () => {
		terms = await getTerms(data.props.id);
	});
</script>

<div class="flex w-full flex-col items-start justify-start gap-10">
	<div class="flex w-full flex-row items-center justify-between border-b-2 border-slate-300 pb-2">
		<h1 class="text-2xl">用語集 - {data.props.title}</h1>
		<a href={'/' + data.props.id} class="text-lg text-blue-500 underline"
			>講座一覧 - {data.props.title}</a
		>
	</div>
	<ul class="flex w-full flex-col items-start justify-start gap-10 px-2">
		{#each terms as term}
			<li class="flex w-full flex-col items-start justify-start gap-2">
				<h2 id={term.title} class="text-xl font-bold underline">
					{term.title}
				</h2>
				<p class="pl-[1em] text-lg">
					{term.description}
				</p>
			</li>
		{/each}
	</ul>
</div>
