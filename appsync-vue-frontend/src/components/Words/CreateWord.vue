<template>
  <v-container>
    <v-btn color="primary" dark @click.stop="dialog = true">Add New Word</v-btn>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title>
          {{ title }}
          <v-spacer></v-spacer>
          <v-icon @click="deleteWord">mdi-delete</v-icon>
        </v-card-title>

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
              <v-btn @click="clear">Cancel</v-btn>
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

import uuidv4 from 'uuid/v4';

export default {
  data: () => ({
    // 
    dialog: false,
    loading: false,
    title: 'Create a New Word',
    
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

  
  
  methods: {
    async addCategoryOption() {

    },

    clear() {

    },

    async deleteWord() {

    },

    async saveWord() {
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
        this.$emit('create-done', { error: false });

      } catch (err) {
        console.log('saveWord err', err);
        this.$emit('create-done', { error: true });
      }
    },
  },
}
</script>