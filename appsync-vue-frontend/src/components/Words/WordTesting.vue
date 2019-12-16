<template>
  <v-container>
    <!-- Opening dialog button -->
    <v-btn v-if="format === 'round'" fab @click.stop="startTest">
      <v-icon dark>mdi-play</v-icon>
    </v-btn>
    <v-btn v-else @click.stop="startTest">
      Launch a Test
      <v-icon right dark>mdi-play</v-icon>
    </v-btn>
    <!--  -->

    <!-- Testing word dialog -->
    <v-dialog v-model="dialog">
      <card-settings v-if="isSetting" 
        @launch="launchTest($event)"
        @cancel="reset" />
      <v-snackbar v-model="isEmpty">No words matching your filters. Try again!</v-snackbar>
      <card-test v-if="isTesting" 
        :word="words[current]"
        :shorter="shorter"
        :showLanguageFirst="showLanguageFirst"
        @next="nextQuestion" />
      <v-card v-if="isComplete">
        Test is complete
        <v-btn @click="reset">Close</v-btn>
      </v-card>
    </v-dialog>
    <!--  -->
  </v-container>
</template>

<script>
import CardSettings from '@/components/Words/CardSettings';
import CardTest from '@/components/Words/CardTest';

import { getWordsTests } from '@/graphql/local/getWordsTest';

export default {

  components: { CardSettings, CardTest, },

  props: {
    format: {
      type: String,
      validator: function (value) {
        return value ? ['round'].indexOf(value) > -1 : true; 
      },
    },
  },

  data: () => ({
    current: 0,
    dialog: false,
    isComplete: false,
    isEmpty: false,
    isSetting: false,
    isTesting: false,
   
    showLanguageFirst: 'english',
    shorter: { isShorter: false, asked: null, found: null},
    words: []
  }),

  methods: {

    launchTest(e) {
      this.words = getWordsTests(e);
      if (this.words.length) {
        if (this.words.length < e.limit) {
          this.shorter = { isShorter: true, asked: e.limit, found: this.words.length };
        } 
        this.isSetting = false;
        this.isTesting = true;
      }
      else this.isEmpty = true;
    },

    nextQuestion() {
      if (this.current === this.words.length - 1) {
        this.isTesting = false;
        this.isComplete = true; 
      } else {
        this.current = this.current + 1;
      }
    },

    reset() {
      this.dialog = this.isEmpty = this.isSetting = this.isTesting = this.isComplete = this.shorter = false;
    },

    startTest() {
      this.isSetting = this.dialog = true;
    },

  },

}
</script>