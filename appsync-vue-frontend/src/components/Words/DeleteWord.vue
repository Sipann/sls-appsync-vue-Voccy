<template>
  <div>
    <v-btn v-if="format === 'round'" fab @click.stop="deleteWord(word)">
      <v-icon dark>mdi-delete</v-icon>
    </v-btn>
    <v-btn v-else @click.stop="deleteWord(word)">
      Delete Word
      <v-icon right dark>mdi-delete</v-icon>
    </v-btn>
  </div>
</template>

<script>
import GET_WORDS from '@/graphql/queries/getWords';
import DELETE_WORD from '@/graphql/mutations/deleteWord';

export default {

  props: {
    format: {
      type: String,
      default: '',
    },
    word: {
      type: Object,
      required: true
    },
  },
  
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
}
</script>