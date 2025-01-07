#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import parse from './src/parse.js';
import gendiff from './src/index.js';
import stylish from './src/formatters/stylish.js'


const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
    .action(async (filepath1, filepath2) => {
        try {
            const data1 = parse(path.resolve(process.cwd(), filepath1));
            const data2 = parse(path.resolve(process.cwd(), filepath2));
            const diff = gendiff(data1, data2);
            console.log(stylish(diff));
        } catch (error) {
            console.error(`Error: ${error.message}`);
            program.help();
        }
    });

program.parse(process.argv);