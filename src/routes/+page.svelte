<script lang="ts">
	import { onMount } from 'svelte';

	const pages = import.meta.glob('$lib/docs/*/index.svx');
	let contents: { title: string, link: string }[] = $state([]);

	onMount(async () => {
		for (const path in pages) {
			const module = await pages[path]();
			const { metadata } = module as { metadata: { title: string } };
			const dir = path.split('/').slice(-2, -1)[0];
			contents.push({ title: metadata?.title || '', link: dir });
		}
	});
</script>

<div class="w-full flex flex-col gap-5 items-start justify-start">
	<div class="w-full flex flex-row items-center justify-between border-b-2 border-slate-300 pb-2">
		<h1 class="text-2xl">講座一覧</h1>
		<a href="terms" class="text-lg text-blue-500 underline">用語集</a>
	</div>
	<ul class="w-full relative flex flex-col items-start justify-start gap-6 p-2">
		{#each contents as { title, link }}
			<li class="w-full flex items-center justify-start gap-4">
				<span class="circle"></span>
				<a href={link} class="text-lg text-blue-500 underline">{title}</a>
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