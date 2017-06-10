import { filter } from 'lodash';

export const filterSearchByName = (searchText, data) => {
  const text = searchText.toLowerCase();
  return filter(data, (i) => {
    const item = i.name.toLowerCase();
    return item.search(text) !== -1;
  });
}
