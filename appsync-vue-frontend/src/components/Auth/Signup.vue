<template>
  <v-row>
    <v-card class="elevation-12">

      <v-toolbar dark color="primary">
        <v-toolbar-title>Sign up</v-toolbar-title>
      </v-toolbar>

      <v-progress-linear :active="loading" :indeterminate="true" :top="true" color="light-blue"></v-progress-linear>

      <v-card-text>
        <v-form @submit.prevent="signUpUser">
          <v-text-field label="name" v-model="name"></v-text-field>
          <v-text-field label="email" v-model="email"></v-text-field>
          <v-text-field label="password" v-model="password"></v-text-field>
          <v-btn type="submit">Sign up</v-btn>
        </v-form>
        <v-divider></v-divider>
        <p>Already have an account?</p>
        <router-link :to="{ name: 'signin' }">Sign In</router-link>
      </v-card-text>    
        
    </v-card>
  </v-row>
</template>

<script>
import { Auth } from 'aws-amplify';

export default {
  data: () => ({
    name: '',
    email: '',
    errorMessage: '',
    loading: false,
    password: '',
    signedIn: false,
  }),

  methods: {

    async signUpUser() {
      this.errorMessage = '';
      this.loading = true;
      try {
        let name = this.name;
        let username = this.name;
        let password = this.password;
        let email = this.email;

        await Auth.signUp({
          username,
          password,
          attributes: {
            email,
            name,
          },
        });
        this.loading = false;
        this.$router.push({ path: '/auth/confirmSignup', query: { name: this.name } });
      } catch (err) {
        console.log('err', err);
        this.errorMessage = err.message;
      }
    },

  },
}
</script>