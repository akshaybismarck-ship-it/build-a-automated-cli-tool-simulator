/**
 * Automated CLI Tool Simulator
 * ============================
 *
 * This project aims to build a command-line interface (CLI) tool simulator that mimics
 * the behavior of a real CLI tool. The simulator will take input commands from the user,
 * process them, and respond with output accordingly.
 *
 * Features
 * --------
 *
 * 1. Command parsing: The simulator will parse user input commands and extract relevant
 *    information such as command name, options, and arguments.
 * 2. Command execution: The simulator will execute the parsed commands and generate
 *    output based on pre-defined rules and scenarios.
 * 3. Output formatting: The simulator will format the output in a human-readable format.
 * 4. Error handling: The simulator will handle errors and exceptions gracefully, providing
 *    user-friendly error messages when necessary.
 *
 * Configuration
 * ------------
 *
 * The simulator can be configured using a JSON file that defines the following:
 * - commands: An object that maps command names to their respective execution functions.
 * - scenarios: An object that defines pre-defined scenarios and their output.
 *
 * Usage
 * -----
 *
 * node npwm_build_a_automat.js [command]
 *
 * Example:
 * node npwm_build_a_automat.js help
 *
 * Output:
 * npwm_build_a_automat.js [command]
 *
 * Available commands:
 *   help   Displays this help message.
 *   hello  Prints a hello message.
 *
 * To add a new command, simply add a new property to the `commands` object in the
 * configuration file and define the execution function accordingly.
 */

// Configuration file
const config = require('./config.json');

// Command parser
function parseCommand(input) {
  const commandParts = input.split(' ');
  const commandName = commandParts[0];
  const options = {};
  const arguments = [];

  for (let i = 1; i < commandParts.length; i++) {
    const part = commandParts[i];
    if (part.startsWith('--')) {
      const optionName = part.substring(2);
      options[optionName] = true;
    } else {
      arguments.push(part);
    }
  }

  return { commandName, options, arguments };
}

// Command executor
function executeCommand(command) {
  const { commandName, options, arguments } = command;
  const commandFn = config.commands[commandName];

  if (!commandFn) {
    console.error(`Unknown command: ${commandName}`);
    return;
  }

  try {
    commandFn(options, arguments);
  } catch (error) {
    console.error(`Error executing command: ${error.message}`);
  }
}

// Main entry point
function main() {
  const argv = process.argv.slice(2);
  const input = argv.join(' ');

  const command = parseCommand(input);
  executeCommand(command);
}

main();