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
import { apolloDecrementCategory } from '@/graphql/apolloRequests/categories';
import { apolloDeleteWord } from '@/graphql/apolloRequests/words';


export default {
  name: 'DeleteWord',

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
        await apolloDeleteWord(word);
        await apolloDecrementCategory(word.category);        
      } catch (err) {
        console.log('deleteWord err', err);
      }
    },

  },

}
</script>