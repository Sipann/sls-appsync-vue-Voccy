<template>
  <div>
    DASHBOARD  
    <word-form />

    <v-snackbar v-model="snackbar" :color="snackColor">
      {{ snackText }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>

  </div>
</template>

<script>
import WordForm from '@/components/Words/WordForm';

export default {
  components: { WordForm },  
  data: () => ({
    error: false,
    snackbar: false,
  }),

  computed: {
    snackColor() {
      return this.error ? 'red' : 'green';
    },

    snackText() {
      return this.error ? 'Something wrong...' : 'Saved!';
    },
  },

}
</script>