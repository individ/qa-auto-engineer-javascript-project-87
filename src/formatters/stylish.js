import _ from 'lodash';
const indent = (depth, symbol) => `${' '.repeat(2 * depth)}${symbol} `;
const stringify = (value, depth) => {
  if (!_.isObject(value)) {
      return String(value);
  }

  const entries = Object.entries(value);
    const result = entries.map(([key, val]) => `${indent(depth + 2, '  ')}${key}: ${stringify(val, depth + 2)}`);
    return `{\n${result.join('\n')}\n${indent(depth + 1, '  ')}}`;
};

export default (tree) => {
    const iter = (nodes, depth) => {
        const result = nodes.map((node) => {
            switch(node.type) {
                case 'nested':
                return `${indent(depth, '  ')}${node.key}: {\n${iter(node.children, depth + 2).join('')}\n${indent(depth + 1, '  ')}}\n`;
                case 'unchanged':
                return `${indent(depth, '  ')}${node.key}: ${stringify(node.value, depth)}\n`;
                case 'added':
                return `${indent(depth, '+ ')}${node.key}: ${stringify(node.value, depth)}\n`;
                case 'removed':
                return `${indent(depth, '- ')}${node.key}: ${stringify(node.value, depth)}\n`;
                case 'updated':
                    return `${indent(depth, '- ')}${node.key}: ${stringify(node.oldValue, depth)}\n${indent(depth, '+ ')}${node.key}: ${stringify(node.newValue, depth)}\n`;
                default:
                 return '';
            }
        });
    return result;
  };

  return `{\n${iter(tree, 1).join('')}}`;
};