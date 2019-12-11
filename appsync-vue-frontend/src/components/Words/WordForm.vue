<template>
  <v-container>

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
                  :items="categoriesOptions" 
                  :disabled="!categoriesOptions.length"
                  label="Category"></v-select>
              </v-col>
              <v-col>
                <v-text-field type="text" v-model="newCategory" label="Add New Category" append-icon="mdi-plus" @click:append="addCategoryOption"></v-text-field>
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

  </v-container>
  
</template>

<script>
import GET_WORDS from '@/graphql/queries/getWords';
import CREATE_WORD from '@/graphql/mutations/createWord';
import UPDATE_WORD from '@/graphql/mutations/updateWord';

import uuidv4 from 'uuid/v4';

export default {

  props: ['action', 'format', 'word'],

  data: () => ({
    // 
    dialog: false,
    loading: false,

    // 
    category: 'none',
    categoriesOptions: [],
    english: '',
    french: '',
    isFormValid: true,
    newCategory: '',
    tag: '',
    tagOptions: ['LOW', 'MEDIUM', 'HIGH'],

  }),

  computed: {
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
        console.log('add new category');  
      } catch (err) {
        console.log('err', err);
      }
    },

    async updateWord() {
      try {
        const variables = {
          input: {
            ItemId: this.word.ItemId,
            english: this.english,
            french: this.french,
            category: this.category,
            tag: this.tag
          }
        };

        await this.$apollo.mutate({
          mutation: UPDATE_WORD,
          variables,

          optimisticResponse: () => ({
            updateWord: {
              __typename: 'Word',
              ...variables.input,
            }
          }),

          update: (cache, { data: { updateWord } }) => {
            const query = GET_WORDS;
            const data = cache.readQuery({ query });
            const index = data.getWords.words.findIndex(word => word.ItemId === updateWord.ItemId);
            data.getWords.words[index] = updateWord;
            cache.writeQuery({ query, data });
          },

        });

        this.dialog = false;
        this.$emit('word-done', { error: false });

      } catch (err) {
        console.log('err', err);
        this.$emit('word-done', { error: true });
      }
    },

    async createWord() {
      try {
        const tempId = 'WORD-' + uuidv4();
        const variables = {
          input: {
            english: this.english,
            french: this.french,
            category: this.category,
            tag: this.tag
          }
        };
        
        const word = {
          ItemId: tempId,
          english: this.english,
          french: this.french,
          category: this.category,
          tag: this.tag
        };

        await this.$apollo.mutate({
          mutation: CREATE_WORD,
          variables,

          optimisticResponse: () => ({
            createWord: {
              __typename: 'Word',
              ...word,
            }
          }),

          update: (cache, { data: { createWord } }) => {
            const query = GET_WORDS;
            const data = cache.readQuery({ query });
            data.getWords.words = [
              ...data.getWords.words.filter(item => item.ItemId !== createWord.ItemId),
              createWord
            ];
            cache.writeQuery({ query, data });
          },


        });
        this.dialog = false;
        this.$emit('word-done', { error: false });

      } catch (err) {
        console.log('saveWord err', err);
        this.$emit('word-done', { error: true });
      }
    },

    async saveWord() {
      if (this.action === 'editing') await this.updateWord();
      else await this.saveWord();
    },


  },
}
</script>