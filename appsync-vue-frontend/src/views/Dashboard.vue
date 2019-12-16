<template>
  <div>
    DASHBOARD  
    <word-form action="creating" :word="{}"/>

    <word-testing />

    <v-snackbar v-model="snackbar" :color="snackColor">
      {{ snackText }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>

  </div>
</template>

<script>
import WordForm from '@/components/Words/WordForm';
import WordTesting from '@/components/Words/WordTesting';

export default {
  name: 'Dashboard',
  components: { WordForm, WordTesting, },  
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