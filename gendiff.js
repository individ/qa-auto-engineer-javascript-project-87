#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import parse from './src/parse.js';
import gendiff from './src/index.js'

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    try {
      const absolutePath1 = path.resolve(process.cwd(), filepath1);
      const absolutePath2 = path.resolve(process.cwd(), filepath2);
        const data1 = parse(absolutePath1);
        const data2 = parse(absolutePath2);
        const result = gendiff(data1, data2, program.opts().format);
      console.log(result);
    } catch (error) {
      console.error(`Ошибка: ${error.message}`);
      program.help();
    }
  });

program.parse(process.argv);