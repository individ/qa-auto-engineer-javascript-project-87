import _ from 'lodash';

const buildDiffTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.uniq([...keys1, ...keys2]).sort();
  const diffTree = allKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return {
        type: 'added',
        key,
        value: obj2[key],
      };
    }
    if (!_.has(obj2, key)) {
      return {
        type: 'removed',
        key,
        value: obj1[key],
      };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        type: 'nested',
        key,
        children: buildDiffTree(obj1[key], obj2[key]),
      };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        type: 'updated',
        key,
        oldValue: obj1[key],
        newValue: obj2[key],
      };
    }
    return {
      type: 'unchanged',
      key,
      value: obj1[key],
    };
  });
  return diffTree;
};

export default (obj1, obj2) => {
  if (_.isObject(obj1) && _.isObject(obj2)) {
    return buildDiffTree(obj1, obj2);
  }
  if (!_.isObject(obj1)) {
    throw new Error('first argument must be an object');
  }
  if (!_.isObject(obj2)) {
    throw new Error('second argument must be an object');
  }
  return undefined;
};
