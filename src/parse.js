import yaml from 'js-yaml';
import * as fs from 'node:fs';

const parse = (data, fileType) => {
  switch (fileType) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Unsupported file type: ${fileType}`);
  }
};

export default parse;