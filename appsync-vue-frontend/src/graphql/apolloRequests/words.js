import { apolloProvider } from '@/aws-config';
import uuidv4 from 'uuid/v4';

import GET_WORDS from '@/graphql/queries/getWords';
import CREATE_WORD from '@/graphql/mutations/createWord';
import DELETE_WORD from '@/graphql/mutations/deleteWord';
import UPDATE_WORD from '@/graphql/mutations/updateWord';

const apolloClient = apolloProvider.defaultClient;

const query = GET_WORDS;


export const apolloCreateWord = async (word) => {
  try {
    const tempId = 'CAT-' + uuidv4();
    await apolloClient.mutate({
      mutation: CREATE_WORD,
      variables: { input: {...word} },

      optimisticResponse: () => ({
        createWord: {
          __typename: 'Word',
          ItemId: tempId,
          ...word,
        }
      }),

      update: (cache, { data: { createWord } }) => {
        const data = cache.readQuery({ query });
        data.getWords.words = [
          ...data.getWords.words.filter(item => item.ItemId !== createWord.ItemId),
          createWord
        ];
        cache.writeQuery({ query, data });
      },
    });
  } catch (err) {
    console.log('apolloCreateWord err', err);
  }
};


export const apolloDeleteWord = async (word) => {
  try {
    await apolloClient.mutate({
      mutation: DELETE_WORD,
      variables: { input: { ItemId: word.ItemId } },

      optimisticResponse: () => ({
        deleteWord: {
          __typename: 'Word',
          ...word
        }
      }),

      update: (cache, { data: { deleteWord } }) => {
        const data = cache.readQuery({ query });
        data.getWords.words = data.getWords.words.filter(word => word.ItemId !== deleteWord.ItemId);
        cache.writeQuery({ query, data });
      },

    });
  } catch (err) {
    console.log('apolloDeleteWord err', err);
  }
}

export const apolloUpdateWord = async (updatedWord) => {
  try {
    await apolloClient.mutate({
      mutation: UPDATE_WORD,
      variables: { input: {...updatedWord}},

      optimisticResponse: () => ({
        updateWord: {
          __typename: 'Word',
          ...updatedWord,
        }
      }),

      update: (cache, { data: { updateWord } }) => {
        const data = cache.readQuery({ query });
        const index = data.getWords.words.findIndex(word => word.ItemId === updateWord.ItemId);
        data.getWords.words[index] = updateWord;
        cache.writeQuery({ query, data });
      },

    });
  } catch (err) {
    console.log('apolloUpdateWord err', err);
  }
};
