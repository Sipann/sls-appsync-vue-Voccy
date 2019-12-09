<template>
  <v-app v-if="hydrated">
    <NavBar />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from '@/components/Shared/NavBar';

export default {
  name: 'App',

  components: { NavBar, },

  data: () => ({
    hydrated: false,
  }),

  async mounted() {
    await this.$apollo.provider.defaultClient.hydrated();
    this.hydrated = true;
  },
};
</script>
