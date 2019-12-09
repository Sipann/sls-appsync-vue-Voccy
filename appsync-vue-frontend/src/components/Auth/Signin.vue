<template>
  <v-row>
    <v-card class="elevation-12">

      <v-toolbar dark color="primary">
        <v-toolbar-title>Sign In</v-toolbar-title>
      </v-toolbar>

      <v-progress-linear :active="loading" :indeterminate="true" :top="true" color="light-blue"></v-progress-linear>

      <v-card-text>
        <v-form @submit.prevent="signInUser">
          <v-text-field label="name" v-model="name"></v-text-field>
          <v-text-field label="password" v-model="password"></v-text-field>
          <v-btn type="submit">Sign In</v-btn>
        </v-form>
        <v-divider></v-divider>
        <p>Forgot your password?</p>
        <router-link :to="{ name: 'resetPassword' }">Reset my password</router-link>
        <v-divider></v-divider>
        <p>Don't already have an account?</p>
        <router-link :to="{ name: 'signup' }">Sign Up</router-link>
      </v-card-text>     

    </v-card>
  </v-row>
</template>

<script>
import { Auth } from 'aws-amplify';
import { AmplifyEventBus } from 'aws-amplify-vue';

export default {
  data: () => ({
    loading: false,
    name: '',
    password: '',
  }),

  methods: {
    async signInUser() {
      this.loading = true;
      try {
        await Auth.signIn(this.name, this.password);
        this.loading = false;
        AmplifyEventBus.$emit('authState', 'signedIn')
        this.$router.push('/dashboard');
      } catch (err) {
        console.log('err', err);
      }
    }
  },

  created() {
    if (this.$route.query.name) this.name = this.$route.query.name;
  },

}
</script>