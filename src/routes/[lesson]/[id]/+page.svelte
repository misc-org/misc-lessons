<script lang="ts">
	import 'github-markdown-css/github-markdown-light.css';
	import '$lib/docs/docs.pcss';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { Spinner } from 'flowbite-svelte';
	import Tip from '$lib/components/Tip.svelte';

	const { data } = $props<{ data: PageData }>();

	interface TermHoverDetail {
		title: string;
		description: string;
		rect: DOMRect;
	}

	let title: string = $state('');
	let html: { head: string; html: string; body: string } = $state({ head: '', html: '', body: '' });

	let container: HTMLElement | null = $state(null);
	let isProcessing = $state(false);

	let tipPosition = $state({ x: 0, y: 0 });
	let tipSize = $state({ width: 0, height: 0 });
	let activeTerm = $state<{ title: string; description: string } | null>(null);
	const MAX_DESCRIPTION_LENGTH = 100;

	const truncateDescription = (text: string) =>
		text.length <= MAX_DESCRIPTION_LENGTH ? text : `${text.slice(0, MAX_DESCRIPTION_LENGTH)}...`;

	const handleTermHover = (detail: TermHoverDetail) => {
		requestAnimationFrame(() => {
			const { rect, title, description } = detail;
			tipPosition = {
				x: rect.top + window.scrollY,
				y: rect.left + window.scrollX
			};
			tipSize = { width: rect.width, height: rect.height };
			activeTerm = { title, description: truncateDescription(description) };
		});
	};

	$effect(() => {
		if (!container) return;

		const handleTermHoverEvent = (e: CustomEvent<TermHoverDetail>) => {
			if (!e.detail) return;
			requestAnimationFrame(() => handleTermHover(e.detail));
		};

		const handleTermLeaveEvent = () => {
			requestAnimationFrame(() => {
				activeTerm = null;
			});
		};

		container.addEventListener('termHover', handleTermHoverEvent as EventListener);
		container.addEventListener('termLeave', handleTermLeaveEvent);

		const observer = new MutationObserver(() => {
			if (!isProcessing && container) {
				isProcessing = true;
				isProcessing = false;
			}
		});

		observer.observe(container, {
			childList: true,
			subtree: true
		});

		return () => {
			observer.disconnect();

			if (!container) return;
			container.removeEventListener('termHover', handleTermHoverEvent as EventListener);
			container.removeEventListener('termLeave', handleTermLeaveEvent);
		};
	});

	onMount(() => {
		html = data.props.html;
		title = data.props.title;
	});
</script>

<svelte:head>
	<title>{'Git / GitHub 講座 - ' + title}</title>
</svelte:head>

{#if html.body}
	<div class="markdown-body h-full w-full" bind:this={container}>
		{@html html.body}
	</div>
	{#if activeTerm}
		<Tip
			position={tipPosition}
			size={tipSize}
			lesson={data.props.lesson}
			term={activeTerm}
			onMouseLeave={() => {
				activeTerm = null;
			}}
		/>
	{/if}
{:else}
	<div class="flex h-full w-full flex-col justify-center">
		<div class="flex w-full flex-row items-center justify-center gap-4">
			<Spinner size="6" color="gray" />
			<p class="text-lg">Loading...</p>
		</div>
	</div>
{/if}
