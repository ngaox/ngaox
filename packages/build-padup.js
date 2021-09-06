const fs = require('fs');
const sass = require('sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const CleanCSS = require('clean-css');

// TODO add support for watch flag

const entryFileNames = ['ngaox'];
const pathOf = path => `${__dirname}\\padup\\${path}`;

// delete css directory
if (fs.existsSync(pathOf('css'))) {
  try {
    fs.rmdirSync(pathOf('css'), { recursive: true });
  } catch (err) {
    console.error(`Error while deleting old css folder.`);
  }
}

// compile scss
fs.mkdirSync(pathOf('css'));
entryFileNames.forEach(filename => {
  compileFile(filename, true);
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
