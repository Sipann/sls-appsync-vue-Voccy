import gql from 'graphql-tag';

const UPDATE_CATEGORY_UP = gql`
  mutation updateCategoryUp($ItemId: String!) {
    updateCategoryUp(ItemId: $ItemId) {
      ItemId
      title
      numbers
    }
  }
`;

export default UPDATE_CATEGORY_UP;