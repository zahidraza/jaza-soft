import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import json from 'rollup-plugin-json';
import sourceMaps from "rollup-plugin-sourcemaps";
import camelCase from "lodash.camelcase";
import typescript from "rollup-plugin-typescript2";

const pkg = require("./package.json");

const libraryName = "jaza-soft";

export default {
  input: `src/${libraryName}.tsx`,
  output: [
    { file: pkg.main, name: camelCase(libraryName), format: "umd", sourcemap: true },
    { file: pkg.module, format: "es", sourcemap: true }
  ],

  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: "src/**"
  },
  plugins: [
    builtins(),
    nodeResolve({ jsnext: true, main: true, browser: true }),
    commonjs({
      exclude: ['node_modules/rollup-plugin-node-globals/**'],
      namedExports: {
        "node_modules/react/index.js": [
          "Component",
          "PureComponent",
          "Children",
          "createElement",
          "createFactory"
        ],
        "node_modules/prop-types/index.js": ["func", "string", "bool", "number", "object"],
        "node_modules/redux-saga/effects": ["AllEffect", "GenericAllEffect"],
        "node_modules/material-ui/styles/index.js": ["createMuiTheme","MuiThemeProvider", "withStyles", "WithStyles","Theme"],
        "node_modules/material-ui/List/index.js": ["ListItem", "ListItemIcon", "ListItemText"]
      }
    }),
    globals(),
    json(),

    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),

    // Resolve source maps to the original source
    sourceMaps()
  ]
};
