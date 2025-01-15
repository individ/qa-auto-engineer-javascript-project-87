const plain = (data) => {
    const iter = (tree, path = '') => {
        const result = tree.flatMap((node) => {
        const currentPath = path ? `${path}.${node.key}` : node.key;
        switch (node.status) {
        case 'deleted':
            return `Property '${currentPath}' was removed`;
        case 'added':
            return `Property '${currentPath}' was added with value: ${node.value}`;
        case 'changed':
            return `Property '${currentPath}' was updated. From ${node.value1} to ${node.value2}`;
        case 'object':
            return iter(node.children, currentPath);
        default:
            return '';
        }
    });
    return result.filter((el) => el !== '').join('\n');
};
return iter(data);
};

export default plain;