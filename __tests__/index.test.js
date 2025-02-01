import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getString = (data) => String(data).trim();

const getFilePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);
const readFile = (filepath) => readFileSync(getFilePath(filepath), 'utf-8');

const files = [
  ['filepath1.json', 'filepath2.json'],
  ['filepath1.yml', 'filepath2.yml'],
  ['filepath1.yaml', 'filepath2.yaml'],
];

test.each(files)('gendiff for stylish', (file1, file2) => {
  const filepath1 = getFilePath(file1);
  const filepath2 = getFilePath(file2);
  const result = readFile('resultStylish.txt');
  expect(gendiff(filepath1, filepath2, 'stylish')).toEqual(getString(result));
});

test.each(files)('gendiff for plain', (file1, file2) => {
  const filepath1 = getFilePath(file1);
  const filepath2 = getFilePath(file2);
  const result = readFile('resultPlain.txt');
  expect(gendiff(filepath1, filepath2, 'plain')).toEqual(getString(result));
});

test.each(files)('gendiff for json', (file1, file2) => {
  const filepath1 = getFilePath(file1);
  const filepath2 = getFilePath(file2);
  const result = readFile('resultJson.txt');
  expect(gendiff(filepath1, filepath2, 'json')).toEqual(getString(result));
});
