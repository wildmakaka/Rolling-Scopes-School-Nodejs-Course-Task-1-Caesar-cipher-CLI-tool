const { program } = require('commander');
const {
  writeDataFromStdInputToStdOut,
  writeDataFromInputToStdOut,
  writeDataFromStdInToOutput,
  writeDataFromInputToOutput,
} = require('./utils/utils');
const { ENCODE, DECODE } = require('./utils/constants');

console.log('START!');

let action;
let shift;
let input;
let output;

program
  .storeOptionsAsProperties(true)
  .option('-a, --action [action]', 'action encode/decode')
  .option('-s, --shift [shift]', 'shift')
  .option('-i, --input [input]', 'input')
  .option('-o, --output [output]', 'output')
  .parse(process.argv);

program.action
  ? (action = program.action)
  : console.log('[INFO] no action specified!');
program.shift
  ? (shift = program.shift)
  : console.log('[INFO] no shift specified!');
program.input
  ? (input = program.input)
  : console.log('[INFO] no input specified!');
program.output
  ? (output = program.output)
  : console.log('[INFO] no output specified!');

try {
  shift = +shift;

  if (!action) {
    throw '[ERROR APP] Parameter action is critical important! Please specify and try again!';
  }

  if (!(action == ENCODE || action == DECODE)) {
    throw '[ERROR APP] Parameter action should be encode or decode!';
  }

  if (!shift) {
    throw '[ERROR APP] Parameter shift is critical important! Please specify and try again!';
  }

  // TODO: Не отрабатывает

  if (!Number(shift)) {
    throw '[ERROR APP] Parameter shift should be a number!';
  }

  if (shift < 0) {
    shift = Math.abs(program.shift);

    if (action === ENCODE) {
      action = DECODE;
    } else if (action === DECODE) {
      action = ENCODE;
    }
  }
} catch (error) {
  // console.error(error);
  process.stderr.write(error);
  process.exit(1);
}

try {
  let myArgs = program.args;
  myArgs = myArgs.filter((item) => {
    return item !== 'src/my_caesar_cli.js' || item !== 'node';
  });

  if (action && shift && !input && !output) {
    writeDataFromStdInputToStdOut(action, shift);
  } else if (action && shift && input && !output) {
    writeDataFromInputToStdOut(action, shift, input);
  } else if (action && shift && !input && output) {
    writeDataFromStdInToOutput(action, shift, output);
  } else if (action && shift && input && output) {
    writeDataFromInputToOutput(action, shift, input, output);
  } else {
    throw '[ERROR APP] Not enoguth parameters to calculation!';
  }
} catch (error) {
  // console.error(error);
  process.stderr.write(error);
  process.exit(1);
}
