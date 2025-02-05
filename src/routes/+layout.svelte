<script lang="ts">
    import '../app.css';
    import '@fontsource-variable/m-plus-1';
    import Icon from '@iconify/svelte';
    import { base } from '$app/paths';
    import { writable, type Writable } from 'svelte/store';
    import src from '$lib/img/logo.svg';

    let {children} = $props();

    const main: Writable<HTMLElement | null> = writable(null);
    const isScrollable = writable(false);

    const checkScroll = () => {
        if ($main) {
            // スクロール可能かつ一番上から100px以上スクロールされているか
            isScrollable.set($main.scrollHeight > $main.clientHeight || $main.scrollTop > 100);
        }
    };

    $effect(() => {
        checkScroll();
    })
</script>

<main
    bind:this={$main}
    onscroll={checkScroll}
    class="relative min-h-[100svh] flex flex-col items-center justify-start bg-[#f0f0f0]"
>
<span class="fixed top-20 left-20">{$main?.scrollHeight + ' ' + $main?.clientHeight}</span>
    {#if $isScrollable}
        <div>
            <button
                onclick={() => $main?.scrollTo({ top: 0, behavior: 'smooth' })}
                class="fixed bottom-4 right-4 w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-md"
            >
                <Icon icon="mdi:arrow-up" class="text-slate-900 w-6 h-6" />
            </button>
        </div>
    {/if}
    <header class="w-full h-[60px] bg-[#0e1734] flex gap-5 items-center justify-center">
        <a href="/" class="w-fit h-full flex items-center justify-center gap-4">
            <img src={src} alt="svelte" class="h-[20px] object-cover"/>
            <h1 class="text-[#fff] text-xl font-bold">講座総合 MISC Lessons</h1>
        </a>
    </header>
    <div class="w-full min-h-[calc(100svh-120px)] flex flex-col items-center justify-start py-16 px-24">
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