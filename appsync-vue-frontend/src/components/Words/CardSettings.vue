<template>
  <v-container>
    <v-card>
      <v-form @submit.prevent="launchTest"
        ref="form"
        lazy-validation
        v-model="isFormValid">
        <v-row>
          <v-select label="Category" :items="categoriesAvailable" v-model="category"></v-select>
        </v-row>
        <v-row>
          <v-select label="Tag" :items="tagsOptions" v-model="tag"></v-select>
        </v-row>
        <v-row>
          <v-text-field type="number" label="number of words" 
            v-model.number="limit"
            :rules="limitRules"></v-text-field>
        </v-row>
        <v-btn type="submit" :disabled="!isFormValid">Launch Test</v-btn>
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
    isFormValid: true,    
    tagsOptions: ['LOW', 'MEDIUM', 'HIGH'],

    // filters
    category: '',
    tag: '',
    limit: null,

    // Form Validation Rules
    limitRules: [
      num => typeof num === 'number' || 'You must provide a number',
      num => num >= 1 || 'You can not be tested on less than 1 word!',
      num => Number.isInteger(num) || 'You can not be tested on part of a word',
    ],

  }),

  computed: {
    categoriesAvailable() {
      return [...this.categoriesOptions.map(cat => cat.title)];
    },

  },

  mounted() {
    if (localStorage.getItem('voccy-testLength')) {
      this.limit = parseInt(localStorage.getItem('voccy-testLength'));
    }
  },

  methods: {
    cancel() {
      this.category = this.tag = '';
      this.limit = null;
      this.$emit('cancel');
    },

    launchTest() {
      if (this.$refs.form.validate()) {
        let filters = {
          category: this.category,
          tag: this.tag,
          limit: this.limit,
        };
      this.$emit('launch', filters);
      }
    },

  },

  apollo: {
    categoriesOptions: {
      query: () => GET_CATEGORIES,
      update: data => data.getCategories,
    },
  },
}
</script>