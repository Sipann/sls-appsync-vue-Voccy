<template>
  <div>
    DASHBOARD  
    <word-form action="creating" :word="{}"/>

    <v-snackbar v-model="snackbar" :color="snackColor">
      {{ snackText }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>

  </div>
</template>

<script>
import WordForm from '@/components/Words/WordForm';

export default {
  name: 'Dashboard',
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