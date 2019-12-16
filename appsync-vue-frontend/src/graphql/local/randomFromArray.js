export const randomFromArray = (source, filters) => {
  let { category, tag, limit } = filters;
  let ceil, i;
  let arr = [];
  let results = [];

  if (category && tag) {
    arr = source.filter(item => item.category === category && item.tag === tag);
  } else if (category) {
    arr = source.filter(item => item.category === category);
  } else if (tag) {
    arr = source.filter(item => item.tag === tag);
  } else {
    arr = [...source];
  }

  ceil = arr.length >= limit ? limit : arr.length;
  i = 0;

  while (i < ceil) {
    let index = Math.floor(Math.random() * arr.length);
    results.push(arr[index]);
    arr.splice(index, 1);
    i++;
  }

  return results;

}
