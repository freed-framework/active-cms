/**
 * @file 用于发布之前 compile
 * @author denglingbo
 */
const gulp = require('gulp');
const clean = require('gulp-clean');
const babel = require('gulp-babel');

const output = './lib';
const src = './';

gulp.task('clean', () =>
    gulp.src([output], {read: false})
        .pipe(clean())
)

gulp.task('babel', ['clean'], () =>
    gulp.src([
        `${src}components/*.jsx`,
        `${src}components/**/*.jsx`,
        `${src}components/**/*.js`,
    ])
    .pipe(babel({
        presets: ['react', 'es2015', 'stage-0'],
        plugins: ['transform-runtime', 'transform-decorators-legacy']
    }))
    .pipe(gulp.dest(output))
)

gulp.task('move-script-static', ['clean'], () =>
    gulp.src([
        `${src}components/**/*.scss`,
        `${src}components/**/*.css`,
        `${src}components/**/*.png`,
        `${src}components/**/*.eot`,
        `${src}components/**/*.svg`,
        `${src}components/**/*.ttf`,
        `${src}components/**/*.woff`,
        `${src}components/**/*.json`,
    ]).pipe(gulp.dest(output))
)

gulp.task('move-style', ['clean'], () =>
    gulp.src([
        `${src}style/*.css`,
    ])
    .pipe(gulp.dest(`${output}/style/`))
)

gulp.task('default', ['clean', 'babel', 'move-style', 'move-script-static']);
