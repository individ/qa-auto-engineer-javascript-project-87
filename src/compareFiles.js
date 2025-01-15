import _ from 'lodash';

const getSortedKeys = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const unionKeys = _.union(keys1, keys2);
  return [...unionKeys].sort();
};

const compareFiles = (data1, data2) => {
  const sortedKeys = getSortedKeys(data1, data2);
  return sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (_.has(data1, key) && !_.has(data2, key)) {
      return { key, value: value1, status: 'deleted' };
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return { key, value: value2, status: 'added' };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      const children = compareFiles(value1, value2);
      if (children.length > 0) {
          return { key, children, status: 'changed' };
      } else {
          return { key, value: value1, status: 'unchanged' };
      }
    }
    if (value1 !== value2) {
      return { key, value1, value2, status: 'changed' };
    }
    return { key, value: value1, status: 'unchanged' };
  });
};

export default compareFiles;