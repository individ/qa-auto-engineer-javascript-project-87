export default function gendiff(data1, data2, format) {
      return `Difference between ${JSON.stringify(data1)} and ${JSON.stringify(data2)} in ${format} format`;
  }