import gql from 'graphql-tag';

const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      ItemId
      title
      numbers
    }
  }
`;

export default GET_CATEGORIES;