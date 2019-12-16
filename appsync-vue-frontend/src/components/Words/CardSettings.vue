<template>
  <v-container>
    <v-card>
      <v-form @submit.prevent="launchTest">
        <v-row>
          <v-select label="Category" :items="categoriesAvailable" v-model="category"></v-select>
        </v-row>
        <v-row>
          <v-select label="Tag" :items="tagsOptions" v-model="tag"></v-select>
        </v-row>
        <v-row>
          <v-text-field type="number" label="number of words" v-model="limit"></v-text-field>
        </v-row>
        <v-btn type="submit">Launch Test</v-btn>
        <v-btn type="button" @click="cancel">Cancel</v-btn>
      </v-form>

      
    </v-card>
  </v-container>
</template>

<script>
import GET_CATEGORIES from '@/graphql/queries/getCategories';

export default {

  data: () => ({
    // data
    categoriesOptions: [],
    tagsOptions: ['LOW', 'MEDIUM', 'HIGH'],

    // filters
    category: '',
    tag: '',
    limit: null,
  }),

  computed: {
    categoriesAvailable() {
      return [...this.categoriesOptions.map(cat => cat.title)];
    },

  },

  methods: {
    cancel() {
      this.category = this.tag = '';
      this.limit = null;
      this.$emit('cancel');
    },

    launchTest() {
      let filters = {
        category: this.category,
        tag: this.tag,
        limit: this.limit,
      };
      this.$emit('launch', filters);
    }
  },

  apollo: {
    categoriesOptions: {
      query: () => GET_CATEGORIES,
      update: data => data.getCategories,
    },
  },
}
</script>