import gql from 'graphql-tag';

const GET_WORDS_BY_TAG = gql`
  query getWordsByTag($tag: String!, $limit: Int, $nextToken: String) {
    getWordsByTag(tag: $tag, limit: $limit, nextToken: $$nextToken) {
      words {
        ItemId
        english
        french
        category
        title
      }
      nextToken
    }
  }
`;

export default GET_WORDS_BY_TAG;