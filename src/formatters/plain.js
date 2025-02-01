import _ from 'lodash';

const getValue = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  return _.isObject(value) ? '[complex value]' : String(value);
};

const getPlain = (data) => {
  const iter = (value, path) => {
    const result = value
      .filter((node) => node.status !== 'unchanged')
      .flatMap((node) => {
        const {
          key, children, value1, value2, status,
        } = node;
        const fullPath = (path === '') ? key : `${path}.${key}`;
        switch (status) {
          case 'object':
            return iter(children, fullPath);
          case 'added':
            return `Property '${fullPath}' was added with value: ${getValue(value2)}`;
          case 'deleted':
            return `Property '${fullPath}' was removed`;
          case 'changed':
            return `Property '${fullPath}' was updated. From ${getValue(value1)} to ${getValue(value2)}`;
          default:
            throw new Error(`Неизвестный статус ${status}`);
        }
      });
    return [...result].join('\n');
  };
  return iter(data, '');
};

export default getPlain;
