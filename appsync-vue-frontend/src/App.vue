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

import GET_ALL_WORDS from '@/graphql/queries/getAllWords';

export default {
  name: 'App',

  components: { NavBar, },

  data: () => ({
    hydrated: false,
  }),

  async mounted() {
    await this.$apollo.provider.defaultClient.hydrated();
    this.hydrated = true;

    const allWords = await this.$apollo.query({
      query: GET_ALL_WORDS,
      variables: { limit: 250 },
    });

    console.log('allWords', allWords.data.getWords.words);
  },
};
</script>
