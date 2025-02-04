import type { PageServerLoad } from "./$types";
import { lessons } from "$lib/docs";

export const load: PageServerLoad = async ({ params }) => {
    const { lesson } = params;
    const lessonData = lessons.find((l) => l.id === lesson);

    return {
        props: {
            title: lessonData?.title || "",
            id: lesson,
        }
    };
};