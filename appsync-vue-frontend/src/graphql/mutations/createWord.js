
import gql from 'graphql-tag';

const CREATE_WORD = gql`
  mutation createWord($input: CreateWordInput!) {
    createWord(input: $input) {
      UserId
      ItemId
      english
      french
      category
      tag
    }
  }
`;


export default CREATE_WORD;