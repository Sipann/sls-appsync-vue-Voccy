import gql from 'graphql-tag';

const GET_WORD = gql`
  query getWord ($ItemId: String!) {
    getWord(ItemId: $ItemId) {
      ItemId
      english
      french
      category
      tag
    }
  }
`;

export default GET_WORD;