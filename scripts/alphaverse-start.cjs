#!/usr/bin/env node
'use strict';
// Independent development entry point. The inherited runtime still accepts STARNET_*
// environment variable names for compatibility; these are protocol keys, not branding.
const fs = require('node:fs');
const path = require('node:path');
const base = path.resolve(__dirname, '..');
const dataDir = path.join(base, 'alphaverse-workspaces');
fs.mkdirSync(dataDir, { recursive: true });
process.env.STARNET_WORKSPACES = dataDir;
process.env.SKYNET_WORKSPACES = dataDir;
process.env.ALPHAVERSE_WORKSPACES = dataDir;
require('../sidecar/index.js');
