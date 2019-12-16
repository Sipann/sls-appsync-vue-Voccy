<template>
  <v-container>
    <v-btn v-if="paginated.nextToken" @click="showMore">Next</v-btn>

    <v-list-item v-for="word in paginated.words" :key="word.ItemId">
      <v-list-item-content>
        <delete-word :format="format" :word="word" />
        <word-form action="editing" :format="format" :word="word" />
        <v-list-item-title>{{ word.english }}</v-list-item-title>
        <v-list-item-title>{{ word.french }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item> 
    
    <p> {{paginated.nextToken}}</p> 
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
    paginated: {
      words: [],
      nextToken: '',
    },
  }),

  
  methods: {

    async showMore() {
      try {
        this.$apollo.queries.paginated.refetch({
          nextToken: this.paginated.nextToken,
        });
      } catch (err) {
        console.log('showMore err', err);
      }
    },
    
  },

  apollo: {
    paginated: {
      query: () => GET_WORDS,
      variables: { limit: 10 },
      update: data => data.getWords,
    }
  },
  
}
</script>