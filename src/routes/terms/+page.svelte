<script lang="ts">
	import { getTerms } from '$lib/terms';

	const terms = getTerms();
</script>

<div class="w-full">
	<ul class="w-full flex flex-col items-start justify-start gap-10 px-2">
		{#each terms as term}
			<li class="w-full flex flex-col items-start justify-start gap-2">
				<h2 id={term.title} class="text-xl font-bold underline">
					{term.title}
				</h2>
				<p class="text-lg pl-[1em]">
					{term.description}
				</p>
			</li>
		{/each}
	</ul>
</div>