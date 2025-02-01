// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

const parsing = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const parse = (filepath, ext) => {
  try {
    return parsing[ext](filepath);
  } catch (error) {
    if (!Object.hasOwn(parsing, ext)) {
      throw new Error(`Неизвестный формат ${ext}!`);
    } else {
      throw error;
    }
  }
};

export default parse;
