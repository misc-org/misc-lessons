<script lang="ts">
    import '../app.css';
    import '@fontsource-variable/m-plus-1';
    import src from '$lib/img/logo.svg';

    let {children} = $props();
</script>

<main class="w-[100svw] h-[100svh] flex flex-col items-center justify-start bg-[#f0f0f0]">
    <header class="w-full h-[60px] bg-[#0e1734] flex gap-5 items-center justify-center py-5">
        <img src={src} alt="svelte" class="h-full object-cover"/>
        <h1 class="text-[#fff] text-xl font-bold">Git / Github 講座</h1>
    </header>
    <div class="w-full h-full flex flex-col items-center justify-start py-10 px-24">
        {@render children()}
    </div>
</main>

<style lang="postcss">
    :global(body) {
        font-family: 'M PLUS 1 Variable', sans-serif;
    }
</style>