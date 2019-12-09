import gql from 'graphql-tag';

const GET_WORDS = gql`
  query getWords($limit: Int, $nextToken: String) {
    getWords(limit: $limit, nextToken: $$nextToken) {
      words {
        ItemId
        english
        french
        category
        tag
      }
      nextToken
    }
  }
`;

export default GET_WORDS;