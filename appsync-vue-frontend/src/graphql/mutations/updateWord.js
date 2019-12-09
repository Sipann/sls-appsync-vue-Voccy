import gql from 'graphql-tag';

const UPDATE_WORD = gql`
  mutation updateWord($input: UpdateWordInput!) {
    updateWord(input: $input) {
      ItemId
      english
      french
      category
      tag
    }
  }
`;

export default DELETE_WORD;