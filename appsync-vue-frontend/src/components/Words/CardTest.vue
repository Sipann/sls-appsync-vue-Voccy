<template>
  <v-card>
    <v-banner single-line v-if="shorter.isShorter && showBanner">You asked for {{ shorter.asked }} words but only {{ shorter.found }} match your criteria.
      <template v-slot:actions>
        <v-btn text @click="show = false">OK</v-btn>
      </template>
    </v-banner>
    <p>{{ languageFirst }}: {{ word[languageFirst] }}</p>
    <div v-if="showAnswer">
      <word-form action="editing" format="round" :word="word" />
      <p>{{ languageAnswer }}: {{ word[languageAnswer] }}</p>
      <p>{{ word.category }}</p>
      <p>{{ word.tag }}</p>
    </div>
    <v-btn v-show="!showAnswer" @click="showAnswer = true">Show Answer</v-btn>
    <v-btn @click="goNext">Next</v-btn>
  </v-card>
</template>

<script>
import WordForm from '@/components/Words/WordForm';

export default {
  components: { WordForm, },

  props: {
    shorter: {
      type: Object,
    },
    showLanguageFirst: {
      type: String,
      validator: function (value) {
        return ['english', 'french'].indexOf(value) > -1;
      },
    },
    word: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      showAnswer: false,
      showBanner: true,
      languageFirst: 'english',
    }
  },

  computed: {
    languageAnswer() {
      return this.languageFirst === 'english' ? 'french' : 'english';
    },
  },

  mounted() {
    if (localStorage.getItem('voccy-languageFirst')) {
      this.languageFirst = localStorage.getItem('voccy-languageFirst');
    }
  },

  methods: {
    goNext() {
      this.showAnswer = false;
      this.$emit('next');
    },
  },


}
</script>