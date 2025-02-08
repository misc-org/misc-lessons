<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { type PageData } from '../$types';

	const { data } = $props<{ data: PageData }>();
	const allPages = import.meta.glob('$lib/docs/**/lessons/*/index.svx');
	const lesson: { title: string; id: string } = data.props;
	let contents: { title: string; link: string }[] = $state([]);

	const pageCache = new Map();

	const getPages = async (lesson: string) => {
		const cacheKey = `lesson-${lesson}`;

		if (pageCache.has(cacheKey)) {
			return pageCache.get(cacheKey);
		}

		const pages = await Promise.all(
			Object.entries(allPages)
				.filter(([path]) => path.includes(lesson))
				.map(async ([path, loader]) => {
					const module = await loader();
					const { metadata } = module as { metadata: { title: string } };
					const dir = path.split('/').slice(-2, -1)[0];
					return { title: metadata?.title || '', link: dir };
				})
		);

		pageCache.set(cacheKey, pages);
		return pages;
	};

	onMount(async () => {
		contents = await getPages(lesson.id);
	});
</script>

<div class="flex w-full flex-col items-start justify-start gap-5">
	<div class="flex w-full flex-row items-center justify-between border-b-2 border-slate-300 pb-2">
		<h1 class="text-2xl">講座一覧 - {lesson.title}</h1>
		<a href={'/terms/' + lesson.id} class="text-lg text-blue-500 underline">用語集</a>
	</div>
	<ul class="relative flex w-full flex-col items-start justify-start gap-6 p-2">
		{#each contents as { title, link }, i}
			<li
				transition:fly={{ duration: 500, delay: 100 * i, x: 0, y: 25 }}
				class="flex w-full items-center justify-start gap-4"
			>
				<span class="circle"></span>
				<a href={'/' + lesson.id + '/' + link} class="text-lg text-blue-500 underline">{title}</a>
			</li>
		{/each}
	</ul>
</div>

<style lang="postcss">
	:root {
		--color: #000;
	}

	ul::after {
		content: '';
		display: block;
		width: 2px;
		height: 100%;
		background-color: var(--color);
		position: absolute;
		top: 0;
		left: 12px;
	}

	.circle {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: var(--color);
	}
</style>
