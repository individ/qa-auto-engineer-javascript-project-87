import path from 'path';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';

export default (filepath) => {
  const fileExt = path.extname(filepath).slice(1);
  const content = readFileSync(filepath, 'utf-8');
  if (fileExt === 'json') {
    return JSON.parse(content);
  }
  if (fileExt === 'yml' || fileExt === 'yaml') {
    return yaml.load(content);
  }
  throw new Error(`Unsupported file format: ${fileExt}`);
};
