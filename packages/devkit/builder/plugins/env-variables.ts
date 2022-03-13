import { config } from 'dotenv';
import * as dotenv_expand from 'dotenv-expand';
import * as webpack from 'webpack';
import { Configuration } from 'webpack';
import * as fs from 'fs';
import * as path from 'path';

// 👉 https://github.com/chihab/ngx-env
export function envVariablesPlugin() {
  const { raw, stringified } = getClientEnvironment(/^NG_APP/i);
  return {
    webpackConfiguration: async (webpackConfig: Configuration) => {
      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          'process.env': stringified
        })
      );
      return webpackConfig;
    },
    indexHtml: async (content: string) => {
      const rawWithEnv = {
        ...raw,
        NG_APP_ENV: raw['NG_APP_ENV']
      };
      return Object.keys(rawWithEnv).reduce(
        (html, key) =>
          html.replace(
            new RegExp('%' + escapeStringRegexp(key) + '%', 'g'),
            rawWithEnv[key]
          ),
        content
      );
    }
  };
}

function escapeStringRegexp(str: string) {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

function getClientEnvironment(prefix: RegExp) {
  const env = process.env.NG_APP_ENV || process.env.NODE_ENV;
  const dotenvBase = path.resolve(process.cwd(), '.env');
  const dotenvFiles = [
    env && `${dotenvBase}.${env}.local`,
    // Don't include `.env.local` for `test` environment
    // since normally you expect tests to produce the same
    // results for everyone
    env && env !== 'test' && `${dotenvBase}.local`,
    env && `${dotenvBase}.${env}`,
    dotenvBase
  ].filter(Boolean);
  // Load environment variables from .env* files. Suppress warnings using silent
  // if this file is missing. dotenv will never modify any environment variables
  // that have already been set.  Variable expansion is supported in .env files.
  // https://github.com/motdotla/dotenv
  // https://github.com/motdotla/dotenv-expand
  dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
      dotenv_expand.expand(
        config({
          path: dotenvFile
        })
      );
    }
  });
  const processEnv = {
    ...process.env,
    NG_APP_ENV: env
  };
  return Object.keys(processEnv)
    .filter(key => prefix.test(key))
    .reduce(
      (env, key) => {
        env.raw[key] = processEnv[key];
        env.stringified[key] = JSON.stringify(processEnv[key]);
        return env;
      },
      {
        raw: {},
        stringified: {}
      }
    );
}
