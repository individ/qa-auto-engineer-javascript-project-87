import path from 'path';
import process from 'process';
import { readFileSync } from 'fs';
import parse from './parse.js';
import compareFiles from './compareFiles.js';
import getFormat from './formatters/index.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => readFileSync(filepath, 'utf-8');
const getFileType = (filepath) => path.extname(filepath).slice(1);

const getData = (filepath) => {
  const fullPath = getFullPath(filepath);
  const fileType = getFileType(fullPath);
  const fileData = readFile(fullPath);
  return parse(fileData, fileType);
};

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = getData(filepath1);
  const obj2 = getData(filepath2);
  const diff = compareFiles(obj1, obj2);
  const result = getFormat(diff, format);
  return result;
};

export default gendiff;