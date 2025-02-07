<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/m-plus-1';
	import Icon from '@iconify/svelte';
	import src from '$lib/img/logo.svg';
	import { onMount } from 'svelte';

	let { children } = $props();

	let isScrollable = $state(false);
	let scrollTop = $state(0);
	let scrollHeight = $state(0);
	let clientHeight = $state(0);

	onMount(() => {
		const handleScroll = () => {
			if (typeof window !== 'undefined') {
				scrollTop = window.scrollY;
				scrollHeight = document.documentElement.scrollHeight;
				clientHeight = document.documentElement.clientHeight;
			}
		};

		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll);
            handleScroll();
		}

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('scroll', handleScroll);
			}
		};
	});

	$effect(() => {
		isScrollable = scrollHeight > clientHeight && scrollTop > 100;
	});
</script>

<main
	class="relative flex min-h-[100svh] flex-col items-center justify-start overflow-auto bg-[#f0f0f0]"
>
	<div class="fixed right-6 flex h-[40px] w-[40px] duration-300 transition-[opacity,bottom] {isScrollable ? 'opacity-100 bottom-[76px]' : 'opacity-0 bottom-[60px]'}">
		<button
			onclick={() => {
                if (typeof window === 'undefined') return;
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
			class="w-full h-full bg-slate-50 flex items-center justify-center rounded-full shadow-md"
		>
			<Icon icon="mdi:arrow-up" class="h-6 w-6 text-slate-900" />
		</button>
	</div>
	<header class="flex h-[60px] w-full items-center justify-center gap-5 bg-[#0e1734]">
		<a href={"/"} class="flex h-full w-fit items-center justify-center gap-4">
			<img {src} alt="svelte" class="h-[20px] object-cover" />
			<h1 class="text-xl font-bold text-[#fff]">講座総合 MISC Lessons</h1>
		</a>
	</header>
	<div
		class="flex min-h-[calc(100svh-120px)] w-full flex-col items-center justify-start px-24 py-16"
	>
		{@render children()}
	</div>
	<footer class="flex h-[60px] w-full items-center justify-center bg-[#0e1734]">
		<p class="text-sm text-[#fff]">© 2025 MISC</p>
	</footer>
</main>

<style lang="postcss">
	:global(body) {
		font-family: 'M PLUS 1 Variable', sans-serif;
	}
</style>
