import type { RequestHandler } from '@sveltejs/kit';

import { db } from '$lib/db';

export const GET: RequestHandler = async({ params, url }) => {

    let name = params.name;

    let platform = url.searchParams.get('platform');
    let arch = url.searchParams.get('arch');

    let data = await db.languages.get({ name });

    if (platform) data = data.filter((x: any) => x.platform === platform);
    if (arch) data = data.filter((x: any) => x.arch === arch);

    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};