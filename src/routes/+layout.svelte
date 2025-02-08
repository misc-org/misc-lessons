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
	<div
		class="fixed right-6 flex h-[40px] w-[40px] transition-[opacity,bottom] duration-300 {isScrollable
			? 'bottom-8 opacity-100'
			: 'bottom-6 opacity-0'}"
	>
		<button
			onclick={() => {
				if (typeof window === 'undefined') return;
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}}
			class="flex h-full w-full items-center justify-center rounded-full bg-slate-50 shadow-md"
		>
			<Icon icon="mdi:arrow-up" class="h-6 w-6 text-slate-900" />
		</button>
	</div>
	<header class="flex h-[60px] w-full items-center justify-center gap-5 bg-[#0e1734]">
		<a href={'/'} class="flex h-full w-fit items-center justify-center gap-4">
			<img {src} alt="svelte" class="h-[20px] object-cover" />
			<h1 class="text-lg md:text-xl font-bold text-[#fff]">講座総合 MISC Lessons</h1>
		</a>
	</header>
	<div
		class="flex min-h-[calc(100svh-120px)] w-full flex-col items-center justify-start py-8 sm:py-16 px-6 sm:px-10 md:px-24"
	>
		{@render children()}
	</div>
	<footer class="flex flex-row gap-4 h-[120px] w-full items-center justify-center text-xs md:text-sm bg-[#0e1734] text-[#fff]">
		<p>© 2025 MISC</p>
		<a href="https://github.com/misc-org" class="flex flex-row items-center gap-2">
			org:
			<Icon icon="akar-icons:github-fill" class="h-6 w-6" />
		</a>
		<a href="https://github.com/misc-org/misc-lessons" class="flex flex-row items-center gap-2 ">
			repo:
			<Icon icon="catppuccin:folder-github" class="h-6 w-6" />
		</a>
	</footer>
</main>

<style lang="postcss">
	:global(body) {
		font-family: 'M PLUS 1 Variable', sans-serif;
	}
</style>
