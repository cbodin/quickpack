#!/usr/bin/env node

(() => {
  const fs = require('fs');
  const path = require('path');
  const webpack = require('webpack');
  const { ArgumentParser } = require('argparse');
  const resolveApp = (...paths) => path.resolve(process.cwd(), ...paths);

  // Load package config
  const packageConfig = path.resolve(__dirname, '../package.json');
  const packageInfo = require(packageConfig);

  // Configure arguments
  const parser = new ArgumentParser({
    version: packageInfo.version,
    description: packageInfo.description,
  });
  parser.addArgument(['-d', '--development'], {
    help: 'Run in development mode with watcher.',
    action: 'storeTrue',
  });
  parser.addArgument(['--input'], {
    help: 'Define input folder, default "src/".',
    defaultValue: 'src/',
  });
  parser.addArgument(['--output'], {
    help: 'Define output folder, default "dist/".',
    defaultValue: 'dist/',
  });
  parser.addArgument(['--entry'], {
    help: 'Define entry point, default "src/index.js".',
    defaultValue: 'src/index.js',
  });
  parser.addArgument(['--template'], {
    help: 'Define HTML template file, default "src/index.html".',
  });
  parser.addArgument(['--js'], {
    help: 'Define output JS filename, default "bundle.js".',
    defaultValue: 'bundle.js',
  });
  parser.addArgument(['--css'], {
    help: 'Define output CSS filename, default "style.css".',
    defaultValue: 'style.css',
  });
  parser.addArgument(['--html'], {
    help: 'Define output HTML filename, default "index.html".',
    defaultValue: 'index.html',
  });
  parser.addArgument(['--modules'], {
    help: 'Enable babel for npm modules, comma separated.',
    defaultValue: '',
  });

  // Check arguments
  const args = parser.parseArgs();

  // Ensure absolute paths for input, output and entry.
  args.input = resolveApp(args.input);
  args.output = resolveApp(args.output);
  args.entry = resolveApp(args.entry);

  // Add default template file if none was specified.
  const defaultTemplate = resolveApp('src/index.html');
  if (!args.template && fs.existsSync(defaultTemplate)) {
    args.template = defaultTemplate;
  } else if (args.template) {
    args.template = resolveApp(args.template);
  } else {
    args.template = null;
  }

  // Create an array of modules and resolve to node_modules
  args.modules = args.modules.split(',')
    .map(module => module.trim())
    .filter(Boolean)
    .map(module => resolveApp(`node_modules/${module}`));

  // Load webpack config
  const configPath = path.resolve(__dirname, '../webpack.config.js');
  const configFunction = require(configPath);
  const config = configFunction(args);

  // Compile
  webpack(config, () => {
    /* friendly-errors-webpack-plugin will handle errors for us */
  });
})();
