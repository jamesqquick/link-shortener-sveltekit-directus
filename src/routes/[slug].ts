import type { RequestHandler } from "@sveltejs/kit";
import { directus } from "../utils/directus";

interface ShortLink {
    clicks: number;
    slug: string;
    url: string;
    id: number;
}

export const GET: RequestHandler = async ({ params }) => {
    const slug = params.slug;

    try {
        const { data } = await directus.items('links').readByQuery({
            filter: {
                slug
            }
        })
        if (!data || data?.length === 0) {
            return {
                status: 404
            }
        }
        const shortLink = data[0] as ShortLink;
        await directus.items('links').updateOne(shortLink.id, {
            clicks: shortLink.clicks + 1
        })
        return {
            headers: { Location: shortLink.url },
            status: 302
        }
    } catch (err) {
        console.error(err);
        return {
            status: 500
        }
    }

}