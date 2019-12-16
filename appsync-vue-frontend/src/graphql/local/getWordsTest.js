import GET_ALL_WORDS from '@/graphql/queries/getWords';

import { apolloProvider } from '@/aws-config';
import { randomFromArray } from '@/graphql/local/randomFromArray';

const apolloClient = apolloProvider.defaultClient;

export const getWordsTests = (filters) => {
  const query = GET_ALL_WORDS;
  const cache = apolloClient.cache;
  const data = cache.readQuery({ query });
  const source = data.getWords.words;

  return randomFromArray(source, filters);

};