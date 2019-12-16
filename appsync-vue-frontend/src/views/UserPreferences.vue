<template>
  <v-container>
    <v-btn type="submit" :disabled="!isFormValid">Apply Changes</v-btn>
    <v-row>
      <h4>By default, show me words in {{ languageFirst }} first</h4>
      <v-select
        @change="savePreferredLanguageFirst"
        :items="languagesOptions"
        v-model="languageFirst"
        label="Standard"></v-select>
    </v-row>
    <v-row>
      <h4>Number of words asked by test</h4>
      <v-text-field type="number" min="1"
        ref="lengthField" 
        @change="savePreferredTestLength"
        v-model.number="testLength" 
        :rules="testLengthRules" />
    </v-row>
    <p>You can modify these settings when launching a test</p>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isFormValid: true,
      languagesOptions: ['english', 'french'],
      languageFirst: 'english',
      testLength: 5,

      // Form Validation
      testLengthRules: [
        num => typeof num === 'number' || 'You must provide a number',
        num => num >= 1 || 'You can not be tested on less than 1 word!',
        num => Number.isInteger(num) || 'You can not be tested on part of a word',
      ],
    }
  },

  mounted() {
    if (localStorage.getItem('voccy-languageFirst')) {
      this.languageFirst = localStorage.getItem('voccy-languageFirst');
    }
    if (localStorage.getItem('voccy-testLength')) {
      this.testLength = localStorage.getItem('voccy-testLength');
    }
  },

  methods: {
    savePreferredLanguageFirst() {
      localStorage.setItem('voccy-languageFirst', this.languageFirst);
    },

    savePreferredTestLength() {
      if (this.$refs.lengthField.validate()) {
        localStorage.setItem('voccy-testLength', this.testLength);
      }
    },

  },
}
</script>