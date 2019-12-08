import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

import '@/aws-amplify'
import { apolloProvider } from '@/aws-amplify';

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
