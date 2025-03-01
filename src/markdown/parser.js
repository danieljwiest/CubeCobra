import unified from 'unified';
import remark from 'remark-parse';
import gfm from 'remark-gfm';
import math from 'remark-math';
import rehypeKatex from 'rehype-katex';
import slug from 'remark-slug';
import headings from 'remark-autolink-headings';
import cardlink from 'markdown/cardlink';
import cardrow from 'markdown/cardrow';
import centering from 'markdown/centering';
import breaks from 'remark-breaks';
import symbols from 'markdown/symbols';
import userlink from 'markdown/userlink';

const VALID_SYMBOLS = 'wubrgcmtsqepxyz/-0123456789';

const BASE_PLUGINS = [
  cardrow,
  centering,
  math,
  cardlink,
  [gfm, { singleTilde: false }],
  [symbols, { allowed: VALID_SYMBOLS }],
];

export const LIMITED_PLUGINS = [...BASE_PLUGINS, userlink, breaks];

export const ALL_PLUGINS = [...LIMITED_PLUGINS, slug, headings];

export const REHYPE_PLUGINS = [rehypeKatex];

export const rehypeOptions = {
  passThrough: ['element'],
};

export function findUserLinks(text) {
  const mentions = [];
  const processor = unified()
    .use(remark)
    .use(BASE_PLUGINS)
    .use(userlink, { callback: (name) => mentions.push(name) });
  processor.runSync(processor.parse(text));
  return mentions;
}

export default {
  findUserLinks,
  rehypeOptions,
  VALID_SYMBOLS,
  BASE_PLUGINS,
  LIMITED_PLUGINS,
  ALL_PLUGINS,
};
