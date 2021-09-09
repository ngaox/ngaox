const start = +new Date();
const fs = require('fs');
const fsExtra = require('fs-extra');
const sass = require('sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const CleanCSS = require('clean-css');
const path = require('path');

// TODO add support for watch flag

function log(msg, color, newLine = true) {
  colors = {
    green: '\x1b[32m',
    blue: '\x1b[34m',
    greenCheckMark: '\x1b[32m' + '✓ ' + '\x1b[0m'
  };
  console.log((colors[color] || '') + msg + '\x1b[0m' + (newLine ? '\n' : ''));
}

const entryFileNames = ['ngaox'];
const distFolder = path.resolve(
  `${__dirname}\\..\\dist\\padup`.replace(/\\/g, '/')
);
const pathOf = itemPath =>
  path.resolve(`${__dirname}\\padup\\${itemPath}`).replace(/\\/g, '/');

log('Building package: PadUp', 'blue');
log(
  `------------------------------------------------------------------------------
Building scss entry files
------------------------------------------------------------------------------`,
  '',
  false
);

// delete css directory
if (fs.existsSync(pathOf('css'))) {
  try {
    fs.rmdirSync(pathOf('css'), { recursive: true });
    fs.rmdirSync(distFolder, { recursive: true });
  } catch (err) {
    console.error(`Error while deleting old css & dist folders.`);
  }
}
log(`Clearing output directories.`, 'greenCheckMark', false);

// compile scss
fs.mkdirSync(pathOf('css'));
entryFileNames.forEach(filename => {
  compileFile(filename, true);
  log(
    `Entry file '${filename}.scss' compiled successfully!`,
    'greenCheckMark',
    false
  );
});

// copy padup folder to dist
fsExtra.copy(pathOf(''), distFolder).then(() => {
  // scripts end
  log(
    `\n------------------------------------------------------------------------------
Built done! to: ${distFolder}
------------------------------------------------------------------------------`,
    'green'
  );
  const end = +new Date();
  log(`Build at: ${new Date().toISOString()} - Time: ${end - start}ms`);
});

function compileFile(filename, optimize = false) {
  const css_path = pathOf(`css\\${filename}.css`);
  const css_map_path = css_path + '.map';
  const css_min_path = pathOf(`css\\${filename}.min.css`);
  const result = sass.renderSync({
    file: pathOf(`scss\\themes\\${filename}.scss`),
    outFile: css_path,
    sourceMap: !optimize,
    outputStyle: 'expanded'
  });
  fs.writeFileSync(css_path, result.css);
  if (result.map) {
    fs.writeFileSync(css_map_path, result.map);
  }

  if (optimize) {
    const css = fs.readFileSync(css_path);
    postcss([autoprefixer])
      .process(css, { from: css_path, to: css_path })
      .then(result => {
        fs.writeFileSync(css_path, result.css);
        if (result.map) {
          fs.writeFileSync(css_map_path, result.map);
        }
        const minifiedCss = new CleanCSS({}).minify(result.css);
        fs.writeFileSync(css_min_path, minifiedCss.styles);
      });
  }
}
