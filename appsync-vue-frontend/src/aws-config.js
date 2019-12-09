import Vue from 'vue';
import VueApollo from 'vue-apollo';

import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import AWSAppSyncClient from 'aws-appsync';

Amplify.configure({
  Auth : {
    region: process.env.VUE_APP_AWS_COGNITO_REGION, 
    userPoolId: process.env.VUE_APP_USER_POOL_ID,  
    userPoolWebClientId: process.env.VUE_APP_USER_POOL_CLIENT_ID, 
  },
  'aws_appsync_graphqlEndpoint': process.env.VUE_APP_AWS_APPSYNC_ENDPOINT,
  'aws_appsync_region': process.env.VUE_APP_AWS_APPSYNC_REGION,
  'aws_appsync_authenticationType': process.env.VUE_APP_AWS_APPSYNC_AUTH_TYPE, 
});

const appsyncClientConfig = {
  url: process.env.VUE_APP_AWS_APPSYNC_ENDPOINT,
  region: process.env.VUE_APP_AWS_APPSYNC_REGION,
  auth: {
    type: process.env.VUE_APP_AWS_APPSYNC_AUTH_TYPE,
    jwtToken: async () => (await AmplifyModules.Auth.currentSession()).getIdToken().getJwtToken(),
  }
};
const appsyncClientOptions = {
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network"
    }
  }
};
const defaultClient = new AWSAppSyncClient(appsyncClientConfig, appsyncClientOptions);
export const apolloProvider = new VueApollo({ defaultClient });

Vue.use(AmplifyPlugin, AmplifyModules)
Vue.use(VueApollo);
