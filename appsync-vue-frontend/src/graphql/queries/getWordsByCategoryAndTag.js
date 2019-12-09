import gql from 'graphql-tag';

const GET_WORDS_BY_CATEGORY_AND_TAG = gql`
  query getWordsByCategoryAndTag($category: String!, $tag: String!, $limit: Int, $nextToken: String) {
    getWordsByCategoryAndTag(category: $category, tag: $tag, limit: $limit, nextToken: $nextToken) {
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

export default GET_WORDS_BY_CATEGORY_AND_TAG;