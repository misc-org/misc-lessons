<script lang="ts">
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { lessons } from '$lib/docs';

    let contents: { title: string; id: string; img: string }[] = $state([]);
    
    const imageCache = new Map();
    
    const getImage = async (lessonId: string, imgName: string) => {
        const cacheKey = `${lessonId}-${imgName}`;
        
        if (imageCache.has(cacheKey)) {
            return imageCache.get(cacheKey);
        }
        
        const images = import.meta.glob('$lib/docs/**/img/*.{png,jpg,jpeg,svg}', {
            eager: true,
            query: '?url',
            import: 'default'
        });
        
        const imgPath = `/src/lib/docs/${lessonId}/img/${imgName}`;
        const imageUrl = images[imgPath] || '';
        
        imageCache.set(cacheKey, imageUrl);
        return imageUrl;
    };

    onMount(async () => {
        contents = await Promise.all(
            lessons.map(async (lesson) => ({
                ...lesson,
                img: await getImage(lesson.id, lesson.img)
            }))
        );
    });
</script>

<div class="flex w-full flex-col items-start justify-start gap-5">
    <div class="flex w-full flex-row items-center justify-between border-b-2 border-slate-300 pb-2">
        <h1 class="text-2xl">講座一覧</h1>
    </div>
    <div class="grid w-full grid-cols-1 gap-6 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {#each contents as { title, id, img }, i}
            <div
                transition:fly={{ duration: 500, delay: 100 * i, x: 0, y: 25 }}
                class="flex flex-col items-center justify-start gap-2"
            >
                <a href={id} class="w-fulld">
                    <img 
                        src={img} 
                        alt={title} 
                        class="w-full max-w-[500px] rounded-md object-cover shadow-md" 
                    />
                </a>
                <span class="text-lg">{title}</span>
            </div>
        {/each}
    </div>
</div>
