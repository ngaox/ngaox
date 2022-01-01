import { DocContentItem } from 'docs/models';
import * as functions from 'firebase-functions';
import { existsSync, readFileSync } from 'fs';
import path = require('path');
import { DocItems } from '../../../docs-content';

export const getDocContent = functions.https.onRequest((request, response) => {
  const slug: string = request.query.slug as string;
  const docItem = DocItems.filter(
    item => item.slug === slug
  )[0] as DocContentItem;
  const contentPath = path.resolve(
    `${__dirname}/../../`,
    docItem?.contentUrl.replace(/^\//, '../') || ''
  );
  if (!docItem || !docItem?.contentUrl || !existsSync(contentPath)) {
    response.status(404).send('Not found');
    return;
  }
  // response.setHeader('Cache-Control', 'public, max-age=604800');
  response.status(200).send(
    JSON.stringify({
      name: docItem.name,
      type: docItem.type,
      content: readFileSync(contentPath, 'utf8')
    })
  );
});
