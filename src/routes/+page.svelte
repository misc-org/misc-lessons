<script lang="ts">
    import { onMount } from 'svelte';
    import { base } from '$app/paths';
    import { fly } from 'svelte/transition';
    import { lessons } from '$lib/docs';
    
    const imageCache = new Map();
    
    const getImage = async (lessonId: string, imgName: string) => {
        const cacheKey = `${lessonId}-${imgName}`;
        return imageCache.get(cacheKey) || '';
    };

    onMount(() => {
        lessons.forEach(lesson => {
            if (lesson.img) {
                imageCache.set(`${lesson.id}-${lesson.img}`, lesson.img);
            }
        })
    })
</script>

<div class="flex w-full flex-col items-start justify-start gap-5">
    <div class="flex w-full flex-row items-center justify-between border-b-2 border-slate-300 pb-2">
        <h1 class="text-2xl">講座一覧</h1>
    </div>
    <div class="grid w-full grid-cols-1 gap-6 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {#each lessons as { title, id, img }, i}
            <div
                transition:fly={{ duration: 500, delay: 100 * i, x: 0, y: 25 }}
                class="flex flex-col items-center justify-start gap-2"
            >
                <a href={base + id} class="w-full flex flex-col items-center justify-center gap-2">
                    <img 
                        src={img} 
                        alt={title} 
                        class="w-full max-w-[500px] rounded-md object-cover shadow-md" 
                    />
                    <span class="text-md">{title}</span>
                </a>
            </div>
        {/each}
    </div>
</div>
