<template>
  <v-row>
    <v-card class="elevation-12">

      <v-toolbar dark color="primary">
        <v-toolbar-title>Confirm</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-form @submit.prevent="confirmUser">
          <v-text-field disabled label="name" v-model="name"></v-text-field>
          <v-text-field label="code" v-model="code"></v-text-field>
          <v-btn type="submit">Confirm</v-btn>
        </v-form>
      </v-card-text>   

    </v-card>
  </v-row>
</template>

<script>
import { Auth } from 'aws-amplify';

export default {
  data:() => ({
    code: '',
    name: '',
  }),

  methods: {
    async confirmUser() {
      try {
        await Auth.confirmSignUp(this.name, this.code);
        this.$router.push({ path: '/auth/confirmSignup', query: { name: this.name } });
      } catch (err) {
        console.log('err', err);
      }
    }
  },

  created() {
    this.name = this.$route.query.name || '';
  },

}
</script>
