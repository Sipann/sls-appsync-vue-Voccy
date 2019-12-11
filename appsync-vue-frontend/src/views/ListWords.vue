<template>
  <v-container>
    <v-list-item v-for="word in words" :key="word.ItemId">
      <v-list-item-content>
        <v-icon @click="deleteWord(word)">mdi-delete</v-icon>
        <WordForm action="editing" format="icon" :word="word" />
        <v-list-item-title>{{ word.english }}</v-list-item-title>
        <v-list-item-title>{{ word.french }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>  
  </v-container>
</template>

<script>
import GET_WORDS from '@/graphql/queries/getWords';
import DELETE_WORD from '@/graphql/mutations/deleteWord';

import WordForm from '@/components/Words/WordForm';

export default {

  components: { WordForm, },

  methods: {
    async deleteWord(word) {
      try {
        this.$apollo.mutate({
          mutation: DELETE_WORD,
          variables: { input: { ItemId: word.ItemId } },
          optimisticResponse: () => ({
            deleteWord: {
              __typename: 'Word',
              ...word
            }
          }),
          update: (cache, { data: { deleteWord } }) => {
            const query = GET_WORDS;
            const data = cache.readQuery({ query });
            data.getWords.words = data.getWords.words.filter(word => word.ItemId !== deleteWord.ItemId);
            cache.writeQuery({ query, data });
          },
        });

      } catch (err) {
        console.log('deleteWord err', err);
      }
    },


  },
  
  apollo: {
    words: {
      query: () => GET_WORDS,
      update: data => data.getWords.words,
    },
  },
}
</script>