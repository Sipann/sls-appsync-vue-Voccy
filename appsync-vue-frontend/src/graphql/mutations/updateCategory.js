import gql from 'graphql-tag';

const UPDATE_CATEGORY = gql`
  mutation updateCategory($input: UpdateCategoryInput!) {
    updateCategory(input: $input) {
      ItemId
      title
      numbers
    }
  }
`;

export default UPDATE_CATEGORY;