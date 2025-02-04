import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const { lesson, id } = params;

	return {
		props: {
			lesson,
			id,
		}
	};
};