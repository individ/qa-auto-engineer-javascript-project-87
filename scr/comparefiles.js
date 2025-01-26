import _ from 'lodash';

const getSortedKeys = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const unionKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unionKeys);
  return sortedKeys;
};

const compareFiles = (data1, data2) => {
  const keys = getSortedKeys(data1, data2);
  const condition = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.has(data1, key) && !_.has(data2, key)) {
      return `- ${key}: ${value1}`;
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return `+ ${key}: ${value2}`;
    }
    if (_.isEqual(value1, value2)) {
      return `  ${key}: ${value1}`;
    }
    return [
      `- ${key}: ${value1}`,
      `+ ${key}: ${value2}`,
    ].join('\n');
  });
  return ['{', ...condition, '}'].join('\n');
};

export default compareFiles;
