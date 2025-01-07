#!/usr/bin/env node
import { program } from 'commander';

program
  .version('0.0.1', '-V, --version', 'output the version number') // <--- Добавление опции для вывода версии
  .description('Compares two configuration files and shows a difference.')
  .option('-h, --help', 'display help for command');

program.parse(process.argv);

if (program.opts().help) {
    program.help();
}