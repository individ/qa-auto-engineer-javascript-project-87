#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../scr/index.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    //  const options = program.opts().format;
    const result = gendiff(filepath1, filepath2); //   options format
    console.log(result);
  });
program.parse();
