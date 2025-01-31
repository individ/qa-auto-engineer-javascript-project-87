import path from 'path';
import process from 'process';
import { readFileSync } from 'fs';
import parse from './parse.js';
import compareFiles from './comparefiles.js';
import getFormat from './formatters/index.js';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileType = (filepath) => path.extname(filepath).slice(1);
const readFile = (filepath) => readFileSync(filepath);
//  возможно надо добавить getFilePath(filepath)??????
const dataParse = (filepath, ext) => parse(filepath, ext);

const gendiff = (filepath1, filepath2, format) => {
  //  format третьим аргументом (stylish ...)
  const ext1 = getFileType(filepath1);
  const path1 = getFilePath(filepath1);
  const data1 = readFile(path1);
  const ext2 = getFileType(filepath2);
  const path2 = getFilePath(filepath2);
  const data2 = readFile(path2);
  const obj1 = dataParse(data1, ext1);
  const obj2 = dataParse(data2, ext2);
  const difference = compareFiles(obj1, obj2);
  return getFormat(difference, format);
};

export default gendiff;
