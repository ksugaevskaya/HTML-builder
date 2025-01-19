const fs = require('fs');
const path = require('path');
const readline = require('readline');

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const pathFile = path.join(__dirname, 'text.txt');
const stream = fs.createWriteStream(pathFile, { encoding: 'utf-8' });

console.log('Type anything to save it in file and press Enter...');

readLine.on('line', (input) => {
  if (input === 'exit') {
    console.log('Bye, see you in a next task 👋');
    process.exit();
  } else {
    stream.write(input + '\n');
  }
});

// detect ctrl+c
readLine.on('SIGINT', () => {
  console.log('Bye, see you in a next task 👋');
  process.exit();
});
