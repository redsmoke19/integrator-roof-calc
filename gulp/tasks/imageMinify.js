let { src, dest } = require('gulp');
let imagemin = require('gulp-imagemin');
let newer = require('gulp-newer');
let pngQuant = require('imagemin-pngquant');
let jpegRecompress = require('imagemin-jpeg-recompress');

// Минификация и оптимизация изображений

module.exports = function imageMinify() {
  return src([
    'dev/static/images/**/*.{gif,png,jpg,svg,webp}',
    '!dev/static/images/sprite/**/*',
  ])
    .pipe(newer('dist/static/images/'))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
        pngQuant(),
        jpegRecompress(),
      ])
    )
    .pipe(dest('dist/static/images/'));
};
