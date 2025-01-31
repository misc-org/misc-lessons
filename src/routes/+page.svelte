<script lang="ts">
	import { onMount } from 'svelte';

	const pages = import.meta.glob('$lib/docs/*.svx');
	let contents: { title: string, link: string }[] = $state([]);

	onMount(async () => {
		for (const path in pages) {
			const module = await pages[path]();
			const { metadata } = module as { metadata: { title: string } };
			contents.push({ title: metadata?.title || '', link: path });
			console.log(contents);
		}
	});
</script>

<div class="w-full flex flex-col gap-4 items-start justify-start">
	<h1 class="text-xl">講座一覧</h1>
	<ul class="w-full relative flex flex-col items-start justify-start gap-2">
		{#each contents as { title, link }}
			<li class="w-full flex items-center justify-start gap-4">
				<span class="circle"></span>
				<a href={link} class="text-lg text-blue-500 underline">{title}</a>
			</li>
		{/each}
	</ul>
</div>

<style lang="postcss">
    ul::after {
        content: '';
        display: block;
        width: 2px;
        height: 100%;
        background-color: #000;
				position: absolute;
				top: 0;
				left: 4px;
    }

    .circle {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #000;
    }
</style>