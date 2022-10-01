import { IParser } from '../../models/builder';
import * as matter from 'gray-matter';
import { ITocLink } from '../../models/builders/generic';
import { marked } from 'marked';
import { JSDOM } from 'jsdom';

import * as Prism from 'prismjs';

export const markdownParser: IParser = (content: string) => {
  const TOC: ITocLink[] = [];
  const { data, content: markdown } = matter(content);

  const markedRenderer = new marked.Renderer();
  markedRenderer.heading = (text: string, level: 1 | 2 | 3 | 4 | 5 | 6) => {
    const id = text
      .toLowerCase()
      .trim()
      // remove unwanted chars
      .replace(
        /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
        ''
      )
      .replace(/\s/g, '-');
    TOC.push({
      title: text,
      id,
      level: `h${level}`
    });
    return `<h${level} id="${id}">${text}</h${level}>`;
  };

  const html = new JSDOM(
    marked(markdown, {
      renderer: markedRenderer
    })
  ).window.document.body;
  Prism.highlightAllUnder(html);

  return { data, content: html.innerHTML, toc: TOC };
};
