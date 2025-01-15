import path from 'path';
import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const getString = (data) => String(data).trim();
const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);
const readFile = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');


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
  test.each(files)('gendiff for plain', (file1, file2) => {
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);
    const result = gendiff(filepath1, filepath2, 'plain');
    const resultPlain = readFile('resultPlain.txt');
    expect(result).toEqual(getString(resultPlain));
  });
  test.each(files)('gendiff for json', (file1, file2) => {
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);
    const result = gendiff(filepath1, filepath2, 'json');
    const resultJson = readFile('resultJson.txt');
    expect(result).toEqual(getString(resultJson));
  });