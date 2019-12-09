import gql from 'graphql-tag';

const DELETE_WORD = gql`
  mutation deleteWord($input: DeleteWordInput!) {
    deleteWord(input: $input) {
      ItemId
    }
  }
`;

export default DELETE_WORD;
