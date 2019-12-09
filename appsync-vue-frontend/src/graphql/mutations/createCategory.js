import gql from 'graphql-tag';

const CREATE_CATEGORY = gql`
  mutation createCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      ItemId
      title
      numbers
    }
  }
`;

export default CREATE_CATEGORY;