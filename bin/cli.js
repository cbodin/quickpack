#!/usr/bin/env node

(() => {
  const fs = require('fs');
  const path = require('path');
  const webpack = require('webpack');
  const program = require('commander');
  const resolveApp = (...paths) => path.resolve(process.cwd(), ...paths);

  // Load package config
  const packageConfig = path.resolve(__dirname, '../package.json');
  const packageInfo = require(packageConfig);

  // Configure arguments
  program.description(packageInfo.description)
    .option('--input <path>', 'set input folder path', 'src/')
    .option('--output <path>', 'set output folder path', 'dist/')
    .option('--entry <file>', 'set entry file path', 'src/index.js')
    .option('--template <file>', 'set HTML template file (default: "src/index.html")')
    .option('--js <filename>', 'set output JS filename', 'bundle.js')
    .option('--css <filename>', 'set output css filename', 'style.css')
    .option('--html <filename>', 'set ouput HTML filename', 'index.html')
    .option('--modules <modules>', 'enable Babel for npm modules, comma separated')
    .option('-d, --development', 'run in development mode with watcher.')
    .version(packageInfo.version, '-v, --version')
    .parse(process.argv);

  // Add default template file if none was specified.
  const defaultTemplate = resolveApp('src/index.html');
  if (!program.template && fs.existsSync(defaultTemplate)) {
    program.template = defaultTemplate;
  }

  // Split and resolve modules
  if (program.modules) {
    program.modules = program.modules.split(',')
      .map(module => module.trim())
      .filter(Boolean)
      .map(module => resolveApp('node_modules', module));
  } else {
    program.modules = [];
  }

  // Prepare arguments
  const args = {
    input: resolveApp(program.input),
    output: resolveApp(program.output),
    entry: resolveApp(program.entry),
    template: program.template ? resolveApp(program.template) : null,
    js: program.js,
    css: program.css,
    html: program.html,
    modules: program.modules,
    development: !!program.development,
  };

  // Load webpack config
  const configPath = path.resolve(__dirname, '../webpack.config.js');
  const configFunction = require(configPath);
  const config = configFunction(args);

  // Compile
  webpack(config, () => {
    /* friendly-errors-webpack-plugin will handle errors for us */
  });
})();
