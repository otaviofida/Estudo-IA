const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

// ── Paths ────────────────────────────────────
const paths = {
  scss: {
    src: 'scss/**/*.scss',
    entry: 'scss/main.scss',
    dest: 'css/'
  },
  html: './*.html',
  js: 'js/**/*.js'
};

// ── SASS → CSS (dev) ────────────────────────
function compileSass() {
  return gulp.src(paths.scss.entry)
    .pipe(sass({
      silenceDeprecations: ['color-functions', 'global-builtin', 'import'],
    }).on('error', sass.logError))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browserSync.stream());
}

// ── SASS → CSS (production, minified) ───────
function buildSass() {
  return gulp.src(paths.scss.entry)
    .pipe(sass({
      silenceDeprecations: ['color-functions', 'global-builtin', 'import'],
    }).on('error', sass.logError))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(gulp.dest(paths.scss.dest));
}

// ── BrowserSync Server ──────────────────────
function serve(done) {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: 3000,
    open: false,
    notify: false
  });
  done();
}

// ── Watch ───────────────────────────────────
function watchFiles(done) {
  gulp.watch(paths.scss.src, compileSass);
  gulp.watch(paths.html).on('change', browserSync.reload);
  gulp.watch(paths.js).on('change', browserSync.reload);
  done();
}

// ── Tasks ───────────────────────────────────
exports.sass = compileSass;
exports.build = buildSass;
exports.default = gulp.series(compileSass, serve, watchFiles);
