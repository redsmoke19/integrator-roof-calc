let { src, dest } = require('gulp');
let imagemin = require('gulp-imagemin');
let newer = require('gulp-newer');
let rename = require('gulp-rename');
let webp = require('imagemin-webp');

// Минификация и оптимизация изображений WebP

module.exports = function webP() {
  return src([
    'dev/static/images/**/*.{png,jpg,webp}',
    '!dev/static/images/sprite/**/*',
  ])
    .pipe(newer('dist/static/images/'))
    .pipe(
      imagemin([
        webp({
          quality: 75,
        }),
      ])
    )
    .pipe(
      rename({
        extname: '.webp',
      })
    )
    .pipe(dest('dist/static/images/'));
};
