import { apolloProvider } from '@/aws-config';
import uuidv4 from 'uuid/v4';

import GET_CATEGORIES from '@/graphql/queries/getCategories';
import CREATE_CATEGORY from '@/graphql/mutations/createCategory';
import UPDATE_CATEGORY_UP from '@/graphql/mutations/updateCategoryUp';
import UPDATE_CATEGORY_DOWN from '@/graphql/mutations/updateCategoryDown';


const apolloClient = apolloProvider.defaultClient;

const query = GET_CATEGORIES;


export const apolloCreateCategory = async (title) => {
  try {
    const tempId = 'CAT-' + uuidv4();

    await apolloClient.mutate({
      mutation: CREATE_CATEGORY,
      variables: { input: { title: title }},
  
      optimisticResponse: () => ({
        createCategory: {
          __typename: 'Category',
          ItemId: tempId,
          numbers: 0,
          title: title,
        }
      }),
  
      update: (cache, { data: { createCategory } }) => {
        const data = cache.readQuery({ query });
        data.getCategories = [
          ...data.getCategories.filter(item => item.ItemId !== createCategory.ItemId),
          createCategory
        ];
        cache.writeQuery({ query, data });
      }
    });

  } catch (err) {
    console.log('apolloCreateCategory err', err);
  }
};

export const apolloDecrementCategory = async (category) => {
  try {
    if (category === 'none') return;
  
    const cache = apolloClient.cache;
    const data = cache.readQuery({ query });
    const catIndex = data.getCategories.findIndex(cat => cat.title === category);
    const catId = data.getCategories[catIndex].ItemId;
    const catNumbers = data.getCategories[catIndex].numbers - 1;

    await apolloClient.mutate({
      mutation: UPDATE_CATEGORY_DOWN,
      variables: { ItemId: catId },

      optimisticResponse: () => ({
        updateCategoryDown: {
          __typename: 'Category',
          ItemId: catId,
          title: category,
          numbers: catNumbers,
        }
      }),

      update: (cache) => {
        data.getCategories[catIndex].numbers = data.getCategories[catIndex].numbers - 1;
        cache.writeQuery({ query, data });
      },
    });

  } catch (err) {
    console.log('apolloDecrementCategory err', err);
  }
  
};

export const apolloIncrementCategory = async (category) => {
  try {
    const cache = apolloClient.cache;
    const data = cache.readQuery({ query });
    const catIndex = data.getCategories.findIndex(cat => cat.title === category);
    const catId = data.getCategories[catIndex].ItemId;
    const catNumbers = data.getCategories[catIndex].numbers - 1;
  
    await apolloClient.mutate({
      mutation: UPDATE_CATEGORY_UP,
      variables: { ItemId: catId },
  
      optimisticResponse: () => ({
        updateCategoryUp: {
          __typename: 'Category',
          ItemId: catId,
          title: category,
          numbers: catNumbers,
        }
      }),
  
      update: (cache) => {
        data.getCategories[catIndex].numbers = data.getCategories[catIndex].numbers + 1;
        cache.writeQuery({ query, data });
      },
    });

  } catch (err) {
    console.log('apolloIncrementCategory err', err);
  }
  
};