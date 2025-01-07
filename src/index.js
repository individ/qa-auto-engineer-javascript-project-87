import _ from 'lodash';

const buildDiffTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
    const allKeys = _.sortBy(_.union(keys1, keys2));

  return allKeys.map((key) => {
        const value1 = obj1[key];
        const value2 = obj2[key];

        if (_.isObject(value1) && _.isObject(value2)) {
            return {
                key,
                type: 'nested',
                children: buildDiffTree(value1, value2),
            };
        }

        if (value1 === value2) {
            return {
                key,
                type: 'unchanged',
                value: value1,
            };
        }

      if (value1 === undefined) {
           return {
                key,
              type: 'added',
               value: value2,
            };
         }

        if (value2 === undefined) {
            return {
                key,
              type: 'removed',
              value: value1,
            };
         }

         return {
              key,
             type: 'updated',
             oldValue: value1,
             newValue: value2,
          };
  });
};
export default (obj1, obj2) => buildDiffTree(obj1, obj2);