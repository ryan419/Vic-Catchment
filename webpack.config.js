'use strict';

const path = require('path');
const args = require('minimist')(process.argv.slice(2));

// List of allowed environments
const allowedEnvs = ['dev', 'dist'];

// Set the correct environment
var env;
if (args.env) {
  env = args.env;
} else {
  env = 'dev';
}

// Get available configurations
const generateConfigs = (env) => {
  let config = null;

  if (env === 'dev') {
    config = require(path.join(__dirname, 'cfg/dev'));
  } else if (env === 'dist') {
    config = require(path.join(__dirname, 'cfg/dist'));
  } else {
    config = require(path.join(__dirname, 'cfg/base'));
  }

  return config;
}

/**
 * Build the webpack configuration
 * @param  {String} wantedEnv The wanted environment
 * @return {Object} Webpack config
 */
function buildConfig(wantedEnv) {
  let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
  let validEnv = isValid ? wantedEnv : 'dev';
  return generateConfigs(validEnv);
}

module.exports = buildConfig(env);
