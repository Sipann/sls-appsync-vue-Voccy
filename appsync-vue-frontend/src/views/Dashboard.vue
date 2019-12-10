<template>
  <div>
    DASHBOARD  
    <CreateWord @create-done="error = $event.error" />

    <v-snackbar v-model="snackbar" :color="snackColor">
      {{ snackText }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>

  </div>
</template>

<script>
import CreateWord from '@/components/Words/CreateWord';

export default {
  components: { CreateWord },  
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