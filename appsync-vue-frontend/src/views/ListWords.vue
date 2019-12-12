<template>
  <v-container>
    <v-list-item v-for="word in words" :key="word.ItemId">
      <v-list-item-content>
        <delete-word :format="format" :word="word" />
        <word-form action="editing" :format="format" :word="word" />
        <v-list-item-title>{{ word.english }}</v-list-item-title>
        <v-list-item-title>{{ word.french }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>  
  </v-container>
</template>

<script>
import GET_WORDS from '@/graphql/queries/getWords';

import WordForm from '@/components/Words/WordForm';
import DeleteWord from '@/components/Words/DeleteWord';

export default {
  name: 'ListWords',
  components: { WordForm, DeleteWord, },

  data: () => ({
    format: 'round',
  }),

  apollo: {
    words: {
      query: () => GET_WORDS,
      update: data => data.getWords.words,
    },
  },
  
}
</script>