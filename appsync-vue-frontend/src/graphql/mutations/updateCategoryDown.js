import gql from 'graphql-tag';

const UPDATE_CATEGORY_DOWN = gql`
  mutation updateCategoryDown($ItemId: String!) {
    updateCategoryDown(ItemId: $ItemId) {
      ItemId
      title
      numbers
    }
  }
`;

export default UPDATE_CATEGORY_DOWN;