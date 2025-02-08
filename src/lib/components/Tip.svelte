<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	const {
		position,
		size,
		lesson,
		term,
		onMouseLeave,
	}: {
		position: { x: number, y: number };
		size: { width: number, height: number };
		lesson: string;
		term: { title: string, description: string };
		onMouseLeave: MouseEventHandler<HTMLButtonElement>
	} = $props();
</script>

<button
	class="absolute grid w-[200px] grid-rows-[100px_1fr] gap-4"
	style="
		top: {position.x - (100 + 16)}px;
		left: {position.y - Math.abs(200 - size.width) / 2}px;
		height: {size.height + 100 + 16}px;
	 "
	onmouseleave={onMouseLeave}
	onclick={() => {
   window.location.href = `/terms/${lesson}#${encodeURIComponent(term.title)}`;
  }}
>
	 <span
		 class="flex h-full w-full flex-col items-start justify-start gap-2 rounded-md bg-slate-50 p-4 shadow-md"
	 >
		  <span class="text-md">{term.title}</span>
		  <span class="h-full w-full">
		   <span class="text-sm description">{term.description}</span>
		  </span>
		  <span class="triangle"></span>
		 </span>
	<span class="flex h-full w-full"></span>
</button>

<style lang="postcss">
    .triangle {
        position: absolute;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        width: 24px;
        height: 12px;
        overflow: hidden;
        filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1));
    }

    .triangle::after {
        content: '';
        position: absolute;
        width: 12px;
        height: 12px;
        background: #f8fafc;
        transform: translateX(-50%) rotate(45deg);
        top: -6px;
        left: 50%;
    }

    .description {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        position: relative;
        max-height: 3em;
    }

    .description::after {
        content: '...';
        position: absolute;
        bottom: 0;
        right: 0;
        padding-left: 20px;
        background: linear-gradient(to right, transparent, white 50%);
    }
</style>