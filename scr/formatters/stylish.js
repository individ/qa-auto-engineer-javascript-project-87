import _ from 'lodash';

const getIndentation = (depth, countSpace = 4, replacer = ' ') => replacer.repeat(depth * countSpace - 2);
const getBracketIndentation = (depth, replacer = ' ', countSpace = 4) => replacer.repeat(depth * countSpace - countSpace);

const stringify = (data, depth = 1) => {
  if (!_.isPlainObject(data)) return data;

  const currentIndent = getIndentation(depth);
  const bracketIndent = getBracketIndentation(depth);
  const currentValue = Object.entries(data);

  const lines = currentValue.map(([key, value]) => `${currentIndent}  ${key}: ${stringify(value, depth + 1)}`);

  const result = ['{', ...lines, `${bracketIndent}}`].join('\n');
  return result;
};

const getStylish = (data) => {
  const iter = (currentValue, depth = 1) => {
    const currentIndent = getIndentation(depth);
    const backetIndent = getBracketIndentation(depth);
    const lines = currentValue.flatMap((node) => {
      const {
        key, value1, value2, children, status,
      } = node;
      switch (status) {
        case 'deleted':
          return `${currentIndent}- ${key}: ${stringify(value1, depth + 1)}`;
        case 'added':
          return `${currentIndent}+ ${key}: ${stringify(value2, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent}  ${key}: ${value1}`;
        case 'object':
          return `${currentIndent}  ${key}: ${iter(children, depth + 1)}`;
        case 'changed':
          return [
            `${currentIndent}- ${key}: ${stringify(value1, depth + 1)}`,
            `${currentIndent}+ ${key}: ${stringify(value2, depth + 1)}`,
          ];
        default:
          throw new Error(`Неизвестный статус ${status}`);
      }
    });
    return ['{', ...lines, `${backetIndent}}`].join('\n');
  };
  return iter(data);
};

export default getStylish;
