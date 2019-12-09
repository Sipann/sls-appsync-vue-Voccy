import gql from 'graphql-tag';

const GET_WORDS_BY_CATEGORY = gql`
  query getWordsByCategory($category: String!, $limit: Int, $nextToken: String) {
    getWordsByCategory(category: $category, limit: $limit, nextToken: $nextToken) {
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

export default GET_WORDS_BY_CATEGORY;