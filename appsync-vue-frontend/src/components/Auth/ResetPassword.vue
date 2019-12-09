<template>
  <v-container>
    <v-row>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Sign In</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form @submit.prevent="sendCode">
            <v-text-field label="name" v-model="name"></v-text-field>
            <v-btn type="submit">Send me an email</v-btn>
          </v-form>
        </v-card-text>      
      </v-card>
    </v-row>
    
    <v-row v-if="codeHasBeenSent">
      <v-card class="elevation-12">
        <v-toolbar>
          <v-toolbar-title>Enter your reset code</v-toolbar-title>
          <v-form @submit.prevent="resetPassword">
            <v-text-field label="name" v-model="name"></v-text-field>
            <v-text-field label="code" v-model="resetCode"> </v-text-field>
            <v-text-field label="password" v-model="password"></v-text-field>
            <v-btn type="submit">Confirm</v-btn>
          </v-form>
        </v-toolbar>
      </v-card>
    </v-row>
    <v-snackbar v-model="snackbar" :vertical="true" >
      We've sent you an email
      <v-btn color="indigo" text @click="snackbar = false" >Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { Auth } from 'aws-amplify';

export default {
  data: () => ({
    codeHasBeenSent: false,
    name: '',
    password: '',
    resetCode: '',
    snackbar: false,
  }),

  methods: {
    async resetPassword() {
      try {
        await Auth.forgotPasswordSubmit(this.name, this.resetCode, this.password);
        this.$router.push({ name: 'signin', query: { name: this.name } });
      } catch (err) {
        console.log('err', err);
      }
    },
    
    async sendCode() {
      try {
        await Auth.forgotPassword(this.name);
        this.codeHasBeenSent = true;
        this.snackbar = true;
      } catch (err) {
        console.log('err', err);
      }
    },

  },

}
</script>