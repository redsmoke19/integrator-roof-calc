let gulp = require('gulp');
let svgSprite = require('gulp-svg-sprite');
let svgmin = require('gulp-svgmin');
let cheerio = require('gulp-cheerio');
let replace = require('gulp-replace');

// Делаем SVG спрайт

module.exports = function spriteSVG() {
  return gulp
    .src('dev/static/images/sprite/svg/*.svg')
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      cheerio({
        parserOptions: { xmlMode: true },
      })
    )
    .pipe(replace('&gt;', '>'))
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: 'sprite.svg',
          },
        },
      })
    )
    .pipe(gulp.dest('dist/static/images/sprite'));
};
