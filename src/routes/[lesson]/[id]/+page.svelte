<script lang="ts">
	import 'github-markdown-css/github-markdown-light.css';
	import '$lib/docs/docs.pcss';
	import type { PageData } from './$types';
	import { base } from '$app/paths';
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

	const TERM_BOUNDARY = new RegExp(
		'([^\\p{Script=Hiragana}\\p{Script=Katakana}\\p{Script=Han}]|^)' +
			'(TARGET)' +
			'(?=[^\\p{Script=Hiragana}\\p{Script=Katakana}\\p{Script=Han}]|$)',
		'gu'
	);

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
		return `$1<a href="${base}/terms#${term.title}"
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

	const termLinksCache = new Map(
		//terms.map((term: { title: string; description: string }) => [term.title, createTermLink(term)])
	);

	const wrapTermsWithLinks = (content: string) => {
		let processed = content;
		terms.forEach((term: { title: string; description: string }) => {
			const regex = new RegExp(TERM_BOUNDARY.source.replace('TARGET', term.title), 'gu');
			//processed = processed.replace(regex, termLinksCache.get(term.title) || '$1$2');
		});
		return processed;
	};

	const processTextNodes = (element: HTMLElement) => {
		if (!element || element.dataset.processed) return;

		const links = element.getElementsByTagName('a');
		Array.from(links).forEach((link) => {
			link.dataset.processed = 'true';
		});

		const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
			acceptNode: (node) => {
				if (node.parentElement?.dataset.processed) {
					return NodeFilter.FILTER_REJECT;
				}
				return node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
			}
		});

		const textNodes: Text[] = [];
		while (walker.nextNode()) {
			textNodes.push(walker.currentNode as Text);
		}

		textNodes.forEach((textNode) => {
			if (textNode.textContent?.trim()) {
				const span = document.createElement('span');
				span.innerHTML = wrapTermsWithLinks(textNode.textContent);
				//console.log(span);
				if (textNode.parentNode) {
					textNode.parentNode.replaceChild(span, textNode);
				}
			}
		});

		element.dataset.processed = 'true';
	};

	const processTargetElements = (parentNode: HTMLElement) => {
		const elements = parentNode.querySelectorAll('p, li, td, th');
		elements.forEach((element) => {
			if (element instanceof HTMLElement && !element.dataset.processed) {
				processTextNodes(element);
			}
		});
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
				//processTargetElements(container);
				isProcessing = false;
			}
		});

		observer.observe(container, {
			childList: true,
			subtree: true
		});

		//processTargetElements(container);

		return () => {
			observer.disconnect();

			if (!container) return;
			container.removeEventListener('termHover', handleTermHoverEvent as EventListener);
			container.removeEventListener('termLeave', handleTermLeaveEvent);
		};
	});

	let html = $state('');

	onMount(async () => {
		try {
			await loadPage(data.props.lesson, data.props.id);

			html = data.props.lessonHtml.html;
			//html.body = rewriteTags(html.body.join(''), terms);
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
