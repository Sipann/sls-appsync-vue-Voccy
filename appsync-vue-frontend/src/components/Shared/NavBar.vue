<template>

  <v-container fluid>

    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <v-toolbar dark text>
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          <h1 class="title pl-3">Voccy</h1>
        </router-link>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list>
        <v-list-item ripple v-for="item in sideNavItems" :key="item.title" :to="item.link">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary" dark app>
    <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
    <v-toolbar-title class="hidden-xs-only">
      <router-link to="/" tag="span" style="cursor: pointer">Voccy</router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-xs-only">
      <v-btn text v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
        <v-icon class="hidden-sm-only" left>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>

      <v-btn text v-if="signedIn" @click="signoutUser">
        <v-icon class="hidden-sm-only" left>mdi-exit-to-app</v-icon>Sign Out
      </v-btn>
    </v-toolbar-items>

    <router-link to="/profile" v-if="signedIn">
      <v-avatar color="teal" size="48">
        <span class="white--text ">JD</span>  
      </v-avatar>
    </router-link>


  </v-app-bar>
  </v-container>

  
</template>

<script>
import { Auth } from 'aws-amplify';
import { AmplifyEventBus } from 'aws-amplify-vue';

export default {
  name: 'NavBar',
  data() {
    return {
      sideNav: false,
      signedIn: false,    
    };
  },
  computed: {
    
    horizontalNavItems() {
      let items = [];
      if (this.signedIn) {
        items= [
          { icon: 'mdi-account', title: 'Dashboard', link: '/dashboard' },
          { icon: 'mdi-account', title: 'List', link: '/list' },
        ];
      } else {
        items = [
           { icon: 'mdi-lock-open', title: 'Enter', link: '/auth/signin' },
        ];
      }
      return items;
    },
    
    sideNavItems() {
      let items = [];
      if (this.signedIn) {
        items= [
          { icon: 'mdi-account', title: 'Dashboard', link: '/dashboard' },
          { icon: 'mdi-account', title: 'List', link: '/list' },
          { icon: 'mdi-settings', title: 'Preferences', link: '/preferences' },
        ];
      } else {
        items = [
           { icon: 'mdi-lock-open', title: 'Enter', link: '/enter' },
        ];
      }
      return items;
    },
    
  },
  
  created() {
    this.isUserSignedIn();

    AmplifyEventBus.$on('authState', info => {
      if (info === 'signedIn') {
        this.isUserSignedIn();
      } else {
        this.signedIn = false;
      }
    });
  },
  
  
  methods: {
    
    async isUserSignedIn() {
      try {
        const user = await Auth.currentAuthenticatedUser()
        this.signedIn = true;
        console.log('user', user);
      } catch (err) {
        console.log('err', err);
      }
    },
    
    async signoutUser() {
      await Auth.signOut();
      await this.isUserSignedIn();
      AmplifyEventBus.$emit('authState', 'signedOut')
      this.$router.push('/');
    },
    
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    },
  }
}
</script>