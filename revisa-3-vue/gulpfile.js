const { src, dest } = require('gulp');
const minify = require('gulp-minify');

exports.default = function () {
  return src('src/*.js')
    .pipe(minify())
    .pipe(dest('output/'));
};
