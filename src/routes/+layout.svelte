<script lang="ts">
    import '../app.css';
    import '@fontsource-variable/m-plus-1';
    import src from '$lib/img/logo.svg';

    let {children} = $props();
</script>

<main class="min-h-[100svh] flex flex-col items-center justify-start bg-[#f0f0f0]">
    <header class="w-full h-[60px] fixed top-0 left-0 bg-[#0e1734] flex gap-5 items-center justify-center">
        <a href="/" class="w-fit h-full flex items-center justify-center gap-4">
            <img src={src} alt="svelte" class="h-[20px] object-cover"/>
            <h1 class="text-[#fff] text-xl font-bold">Git / Github 講座</h1>
        </a>
    </header>
    <div class="w-full min-h-[calc(100svh-120px)] mt-[60px] flex flex-col items-center justify-start py-16 px-24">
        {@render children()}
    </div>
    <footer class="w-full h-[60px] bg-[#0e1734] flex items-center justify-center">
        <p class="text-[#fff] text-sm">© 2025 MISC</p>
    </footer>
</main>

<style lang="postcss">
    :global(body) {
        font-family: 'M PLUS 1 Variable', sans-serif;
    }
</style>