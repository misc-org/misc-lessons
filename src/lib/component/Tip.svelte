<script lang="ts">
	export let position: { x: number; y: number };
	export let size: { width: number; height: number };
	export let term: {
		title: string;
		description: string;
	};
	export let onMouseLeave: () => void;
</script>

<button
	class="absolute w-[200px] grid grid-rows-[100px_1fr] gap-4"
	style="
		top: {position.x - (100 + 16)}px;
		left: {position.y - (Math.abs(200 - size.width) / 2)}px;
		height: {size.height + 100 + 16}px;
	"
	onmouseleave={onMouseLeave}
	onclick={() => {
		window.location.href = `/terms#${term.title}`;
	}}
>
	<span
		class="w-full h-full flex flex-col bg-slate-50 p-4 rounded-md items-start justify-start gap-2 shadow-md"
	>
		<span class="text-md">{term.title}</span>
		<span class="w-full h-full overflow-y-auto">
			<span class="text-sm">{term.description}</span>
		</span>
		<span class="triangle"></span>
	</span>
	<span
		class="w-full h-full flex"
	></span>
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
</style>
