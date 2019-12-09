import gql from 'graphql-tag';

const DELETE_CATEGORY = gql`
  mutation deleteCategory($input: DeleteCategoryInput!) {
    deleteCategory(input: $input) {
      title
    }
  }
`;

export default DELETE_CATEGORY;