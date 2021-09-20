import { Handler } from '@netlify/functions';
import { Event } from '@netlify/functions/src/function/event';
import { DocItems } from '../../docs-content';
import fetch from 'node-fetch';

export const handler: Handler = async (event: Event, context: any) => {
  try {
    const slug: string = `${event?.path?.split('/')?.pop()}`;
    const docItem = DocItems.filter(item => item.slug === slug)[0];
    if (!docItem || !docItem.contentUrl) {
      return { statusCode: 404 };
    }
    const contentUrl = new URL(
      docItem.contentUrl.replace(/^\//, '../'),
      'https://raw.githubusercontent.com/rabraghib/ngaox/main/docs/'
    );
    const res = await fetch(contentUrl.href);
    return {
      statusCode: 200,
      headers: {
        'Cache-Control': 'public, max-age=604800'
      },
      body: JSON.stringify({
        name: docItem.name,
        content: await res.text()
      })
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed fetching "DocContent" from server'
      })
    };
  }
};
