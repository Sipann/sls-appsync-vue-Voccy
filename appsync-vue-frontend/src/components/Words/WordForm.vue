<template>
  <v-container>

    <!-- Opening dialog button -->
    <v-btn v-if="action === 'editing' && format === 'round'" fab @click.stop="dialog = true">
      <v-icon dark>mdi-pencil</v-icon>
    </v-btn>
    <v-btn v-else-if="action === 'editing' && format !== 'round'" @click.stop="dialog = true">
      Edit Word
      <v-icon right dark>mdi-pencil</v-icon>
    </v-btn>
    <v-btn v-else-if="action === 'creating' && format === 'round'" @click.stop="dialog = true">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <v-btn v-else @click.stop="dialog = true">
      Add New Word
      <v-icon right dark>mdi-plus</v-icon>
    </v-btn>
    <!--  -->

    <!-- Word form dialog -->
    <v-dialog v-model="dialog" max-width="350">
      <v-card>
        <v-card-title>{{ title }}</v-card-title>

        <v-card-text>
          <v-form ref="form" lazy-validation v-model="isFormValid" @submit.prevent="saveWord">

            <v-row>
              <v-text-field label="english" v-model="english"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field label="french" v-model="french"></v-text-field>
            </v-row>
            <v-row>
              <v-select v-model="tag" :items="tagOptions" label="Tag"></v-select>
            </v-row>
            <v-row>
              <v-col :cols="6">
                <v-select v-model="category" 
                  :items="categoriesAvailable" 
                  :disabled="!categoriesOptions.length"
                  label="Category"></v-select>
              </v-col>
              <v-col>
                <v-text-field type="text" v-model="categoryNew" label="Add New Category" append-icon="mdi-plus" @click:append="addCategoryOption"></v-text-field>
              </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-row class="mt-2 d-flex justify-end">
              <v-btn type="submit" :disabled="!isFormValid || loading">Save</v-btn>
              <v-btn type="button" @click="dialog = false">Cancel</v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!--  -->

  </v-container>
  
</template>

<script>
import GET_CATEGORIES from '@/graphql/queries/getCategories';

import { 
  apolloCreateCategory,
  apolloDecrementCategory, 
  apolloIncrementCategory, 
} from '@/graphql/apolloRequests/categories';

import {
  apolloCreateWord,
  apolloUpdateWord,
} from '@/graphql/apolloRequests/words';


export default {
  name: 'WordForm',

  props: {
    action: {
      type: String,
      validator: function (value) {
        return value ? ['editing', 'creating'].indexOf(value) > -1 : true;
      },
    },
    format: {
      type: String,
      validator: function (value) {
        return value ? ['round'].indexOf(value) > -1 : true; 
      },
    },
    word: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    // 
    dialog: false,
    loading: false,

    // 
    category: 'none',
    categoryNew: '',
    categoriesOptions: [],
    english: '',
    french: '',
    isFormValid: true,
    tag: '',
    tagOptions: ['LOW', 'MEDIUM', 'HIGH'],

  }),

  computed: {
    categoriesAvailable() {
      return [...this.categoriesOptions.map(cat => cat.title)];
    },

    title() {
      return this.action === 'editing' ? 'Update Word' : 'Save New Word';
    },
  },

  created() {
    if (this.action === 'editing') {
      this.english = this.word.english || '';
      this.french = this.word.french || '';
      this.category = this.word.category || 'none';
      this.tag = this.word.tag || 'MEDIUM';
    }
  },
  
  methods: {

    async addCategoryOption() {
      try {
        await apolloCreateCategory(this.categoryNew);
        this.category = this.categoryNew;
        this.categoryNew = '';
      } catch (err) {
        console.log('addCategoryOption err', err);
      }
    },

    async updateWord() {
      try {
      const initialCategory = this.word.category;

      const updatedWord = {
        ItemId: this.word.ItemId,
        english: this.english,
        french: this.french,
        category: this.category,
        tag: this.tag
      }
      await apolloUpdateWord(updatedWord);

      if (this.category !== initialCategory) {
        await apolloIncrementCategory(this.category)
        if (initialCategory !== 'none') {
          await apolloDecrementCategory(initialCategory);
        }
      }

      this.dialog = false;
      this.$emit('word-done', { error: false });

      } catch (err) {
        console.log('updateWord err', err);
        this.$emit('word-done', { error: true });
      }
    },

    async createWord() {
      try {
        const word = {
          english: this.english,
          french: this.french,
          category: this.category,
          tag: this.tag
        };
        await apolloCreateWord(word);
        await apolloIncrementCategory(this.category);
        this.dialog = false;
        this.$emit('word-done', { error: false });

      } catch (err) {
        console.log('createWord err', err);
        this.$emit('word-done', { error: true });
      }
    },

    async saveWord() {
      if (this.action === 'editing') await this.updateWord();
      else await this.createWord();
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
