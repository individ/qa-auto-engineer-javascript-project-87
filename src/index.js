import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import compareFiles from './comparefiles.js';
import getFormat from './formatters/index.js';

const dataParse = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const fileExtension = path.extname(filepath).slice(1);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  return parse(fileContent, fileExtension);
};

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = dataParse(filepath1);
  const data2 = dataParse(filepath2);
  const difference = compareFiles(data1, data2);
  return getFormat(difference, format);
};

export default gendiff;
