const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const dirPath = path.join(__dirname, '../../');
const readline = require('readline');

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const ALPHABET_ARRAY = ALPHABET.split('');
const ALPHABET_LENGTH = ALPHABET.split('').length;

const ALPHABET_DOUBLE = ALPHABET + ALPHABET;
const ALPHABET_DOUBLE_ARRAY = ALPHABET_DOUBLE.split('');
const ALPHABET_DOUBLE_UPPER = ALPHABET_DOUBLE.toUpperCase();
const ALPHABET_DOUBLE_ARRAY_UPPER = ALPHABET_DOUBLE_UPPER.split('');

const ALPHABET_ARRAY_REVERSE = [...ALPHABET_ARRAY].reverse();
const ALPHABET_DOUBLE_ARRAY_REVERSE = [...ALPHABET_DOUBLE_ARRAY].reverse();
const ALPHABET_DOUBLE_ARRAY_UPPER_REVERSE = [
  ...ALPHABET_DOUBLE_ARRAY_UPPER,
].reverse();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const calculate = (inputString, action, shift) => {
  let realShift = shift <= ALPHABET_LENGTH ? shift : calculatedShift(shift);
  const result =
    action == 'encode'
      ? encodeString(inputString, realShift)
      : decodeString(inputString, realShift);
  return result;
};

const getFilePath = (inputFileName) => {
  const absPath = inputFileName.includes('/') || inputFileName.includes('\\');
  return absPath ? inputFileName : dirPath + inputFileName;
};

const isFileExists = (fileName) => {
  return new Promise((resolve, reject) => {
    const file = getFilePath(fileName);

    fs.access(file, fs.F_OK, (err) => {
      try {
        if (err) {
          reject(`[ERROR APP] file ${file} is not exists!`);
        }
        resolve('OK!');
      } catch (error) {
        // console.error(error);
        process.stderr.write(error);
        process.exit(1);
      }
    });
  });
};

const writeDataFromInputToOutput = (action, shift, input, output) => {
  const readStream = fs.createReadStream(getFilePath(input), 'utf8');
  const writeStream = fs.createWriteStream(getFilePath(output), {
    flags: 'a',
  });

  readStream
    .on('data', function (chunk) {
      const result = calculate(chunk, action, shift);
      console.log('Result' + '\n', result);
      writeStream.write(result + '\n');
    })
    .on('end', function () {
      console.log('FINISHED! Everythn is OK!');
      rl.close();
      writeStream.end();
    })
    .on('error', function () {
      rl.close();
      process.stderr.write(error);
      process.exit(1);
    });
};

const writeDataFromInputToStdOut = (action, shift, input) => {
  const readStream = fs.createReadStream(getFilePath(input), 'utf8');
  readStream
    .on('data', function (chunk) {
      const result = calculate(chunk, action, shift);
      process.stdout.write(result + '\n');
      rl.close();
    })
    .on('end', function () {
      console.log('FINISHED! Everythn is OK!');
      rl.close();
      readStream.close();
    })
    .on('error', function () {
      rl.close();
      process.stderr.write(error);
      process.exit(1);
    });
};

const writeDataFromStdInToOutput = (action, shift, input, output) => {
  const writeStream = fs.createWriteStream(getFilePath(output), {
    flags: 'a',
  });
  const result = calculate(input, action, shift);
  writeStream.write(result + '\n');
  writeStream.end();
};

const calculatedShift = (shift) => {
  return shift - ALPHABET_LENGTH * parseInt(shift / ALPHABET_LENGTH);
};

const encodeString = (inputString, realShift) => {
  const inputStringArray = inputString.split('');

  let result = '';

  _.forEach(inputStringArray, function (incomeLetter) {
    if (_.indexOf(ALPHABET_ARRAY, incomeLetter.toLowerCase()) == -1) {
      result += incomeLetter;
    } else {
      const letterIndex = _.indexOf(ALPHABET_ARRAY, incomeLetter.toLowerCase());

      const encodedIndex = letterIndex + realShift;
      result +=
        incomeLetter == incomeLetter.toUpperCase()
          ? ALPHABET_DOUBLE_ARRAY_UPPER[encodedIndex]
          : ALPHABET_DOUBLE_ARRAY[encodedIndex];
    }
  });
  return result;
};

const decodeString = (inputString, realShift) => {
  const inputStringArray = inputString.split('');

  let result = '';

  _.forEach(inputStringArray, function (incomeLetter) {
    if (_.indexOf(ALPHABET_ARRAY, incomeLetter.toLowerCase()) == -1) {
      result += incomeLetter;
    } else {
      const letterIndex = _.indexOf(
        ALPHABET_ARRAY_REVERSE,
        incomeLetter.toLowerCase()
      );

      const encodedIndex = letterIndex + realShift;
      result +=
        incomeLetter == incomeLetter.toUpperCase()
          ? ALPHABET_DOUBLE_ARRAY_UPPER_REVERSE[encodedIndex]
          : ALPHABET_DOUBLE_ARRAY_REVERSE[encodedIndex];
    }
  });

  return result;
};

const writeDataFromStdInputToStdOutFinal = (action, shift) => {
  rl.on('line', function (line) {
    const result = calculate(line, action, shift);
    process.stdout.write(result + '\n');
  });

  rl.on('close', function () {
    console.log('\nBYE BYE !!!');
    process.exit(0);
  });
  rl.on('error', function () {
    rl.close();
    process.stderr.write(error);
    process.exit(1);
  });
};

const writeDataFromInputToStdOutFinal = (action, shift, input) => {
  isFileExists(input)
    .then((_result) => {
      writeDataFromInputToStdOut(action, shift, input);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

const writeDataFromStdInToOutputFinal = (action, shift, output) => {
  isFileExists(output)
    .then((_result) => {
      rl.on('line', function (line) {
        writeDataFromStdInToOutput(action, shift, line, output);
      });
      rl.on('close', function () {
        console.log('\nBYE BYE !!!');
        process.exit(0);
      });

      rl.on('error', function () {
        rl.close();
        process.stderr.write(error);
        process.exit(1);
      });
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

const writeDataFromInputToOutputFinal = (action, shift, input, output) => {
  isFileExists(input)
    .then(() => {
      isFileExists(output)
        .then(() => {
          writeDataFromInputToOutput(action, shift, input, output);
        })
        .catch((err) => {
          console.log(err);
          process.exit(1);
        });
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = {
  writeDataFromStdInputToStdOut: writeDataFromStdInputToStdOutFinal,
  writeDataFromInputToStdOut: writeDataFromInputToStdOutFinal,
  writeDataFromStdInToOutput: writeDataFromStdInToOutputFinal,
  writeDataFromInputToOutput: writeDataFromInputToOutputFinal,
};
