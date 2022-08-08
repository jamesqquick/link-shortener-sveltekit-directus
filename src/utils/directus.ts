import { Directus } from '@directus/sdk';
import 'dotenv/config';

const directusToken = process.env.DIRECTUS_API_TOKEN;
const directusUrl = process.env.DIRECTUS_URL;
console.log(directusToken);

if (!directusToken) {
    throw Error("Make sure to add the Directus API Token in your environment variables.")
}

if (!directusUrl) {
    throw Error("Make sure to add the Directus URL in your environment variables.")
}

export const directus = new Directus(directusUrl, {
    auth: {
        staticToken: directusToken
    }
});

