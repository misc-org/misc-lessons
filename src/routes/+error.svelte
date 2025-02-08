<script lang="ts">
	import 'github-markdown-css/github-markdown-light.css';
	import { page } from '$app/state';
</script>

<div class="markdown-body w-full">
	<h1>Error</h1>
	<pre>
        <code>
            {JSON.stringify($state.snapshot(page.error))}
        </code>
    </pre>
</div>

<style lang="postcss">
	.markdown-body {
		background-color: transparent;
	}
</style>
