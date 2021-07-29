const gulp = require('gulp');
const script = require('./gulp/tasks/scripts');
const fonts = require('./gulp/tasks/fonts');
const vendors = require('./gulp/tasks/vendorsJS');
const imageMinify = require('./gulp/tasks/imageMinify');
const styles = require('./gulp/tasks/styles');
const clean = require('./gulp/tasks/clean');
const pug2html = require('./gulp/tasks/pug');
const spriteSVG = require('./gulp/tasks/spriteSVG');
const serve = require('./gulp/tasks/serve');
const spritePNG = require('./gulp/tasks/spritePNG');
const webP = require('./gulp/tasks/webP');
const { argv } = require('yargs');

const dev = gulp.parallel(
  pug2html,
  script,
  vendors,
  styles,
  imageMinify,
  webP,
  spriteSVG,
  spritePNG,
  fonts
);

exports.default = argv.prod ? gulp.series(clean, dev) : gulp.series(clean, dev, serve);
// exports.default = gulp.series(clean, dev, serve);
