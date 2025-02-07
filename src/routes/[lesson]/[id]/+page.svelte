<script lang="ts">
	import 'github-markdown-css/github-markdown-light.css';
	import '$lib/docs/docs.pcss';
	import type { PageData } from './$types';
	import { onMount, type Component } from 'svelte';
	import { rewriteTags } from '$lib/utils/rewrite';
	import { Spinner, Skeleton } from 'flowbite-svelte';
	import Tip from '$lib/component/Tip.svelte';

	const { data } = $props<{ data: PageData }>();

	interface TermHoverDetail {
		title: string;
		description: string;
		rect: DOMRect;
	}

	interface ModuleType {
		default: Component;
		metadata: {
			title: string;
		};
	}

	let Page: Component | null = $state(null);
	let title: string = $state('');
	const terms = data.props.lesson.terms;
	const pageCache = new Map();

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

	const createTermLink = (term: { title: string; description: string }) => {
		return `$1<a href="/terms#${term.title}"
        class="term-link"
        data-term-title="${term.title}"
        data-term-description="${term.description}"
        onmouseenter="
            requestAnimationFrame(() => {
                this.dispatchEvent(new CustomEvent('termHover', {
                    bubbles: true,
                    detail: {
                        title: '${term.title}',
                        description: '${term.description}',
                        rect: this.getBoundingClientRect()
                    }
                }));
            });"
        >${term.title}</a>`;
	};

	const loadPage = async (lesson: string, id: string) => {
		const cacheKey = `${lesson}-${id}`;

		if (pageCache.has(cacheKey)) {
			const cached = pageCache.get(cacheKey);
			Page = cached.component;
			html = cached.html;
			title = cached.title;
			return;
		}

		const pages = import.meta.glob<ModuleType>('/src/lib/docs/**/lessons/**/index.svx', {
			eager: true,
		});

		const pagePath = `/src/lib/docs/${lesson}/lessons/${id}/index.svx`;
		const pageModule = pages[pagePath];

		if (!pageModule) {
			throw new Error(`Page not found: ${pagePath}`);
		}

		const result = {
			component: pageModule.default,
			title: pageModule.metadata.title
		};

		pageCache.set(cacheKey, result);
		Page = result.component;
		title = result.title;
	};

	$effect(() => {
		if (!Page || !container) return;

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

	let html: { head: string, html: string, body: string } = $state({ head: '', html: '', body: '' });

	onMount(async () => {
		try {
			await loadPage(data.props.lesson, data.props.id);

			html = data.props.lessonHtml.html;
		} catch (error) {
			console.error('Failed to load page:', error);
		}
	});
</script>

<svelte:head>
	<title>{'Git / GitHub 講座 - ' + title}</title>
</svelte:head>

{#if Page}
	<div class="markdown-body h-full w-full" bind:this={container}>
		{@html html.body}
	</div>
	{#if activeTerm}
		<Tip
			position={tipPosition}
			size={tipSize}
			term={activeTerm}
			onMouseLeave={() => {
				activeTerm = null;
			}}
		/>
	{/if}
{:else}
	<div class="flex h-full w-full flex-col justify-center">
		<div class="flex w-full flex-row items-center justify-center gap-4">
			<Spinner size="6" />
			<p class="text-lg">Loading...</p>
		</div>
		<div class="flex w-full flex-col items-center justify-start gap-5">
			<Skeleton size="sm" />
			<Skeleton size="md" />
			<Skeleton size="lg" />
			<Skeleton size="xl" />
			<Skeleton size="xxl" />
		</div>
	</div>
{/if}
