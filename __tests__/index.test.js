import path from 'path';
import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const getString = (data) => String(data).trim();
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const files = [
  ['filepath1.json', 'filepath2.json'],
  ['filepath1.yaml', 'filepath2.yaml'],
];

test.each(files)('gendiff for stylish', (file1, file2) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const result = gendiff(filepath1, filepath2, 'stylish');
  const resultStylish = readFile('resultStylish.txt');
  expect(result).toEqual(getString(resultStylish));
});