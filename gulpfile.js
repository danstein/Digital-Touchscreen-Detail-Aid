/* jshint node: true */

var gulp = require('gulp'),
    fs = require('fs'),
    path= require('path'),
    runSequence = require('run-sequence'),
    htmllint = require('gulp-htmllint')
    include = require('gulp-html-tag-include'),
    replace = require('gulp-replace-task'),
    htmlmin = require('gulp-html-minifier'),
    w3cjs = require('gulp-w3cjs'),
    sass = require('gulp-sass'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    eslint = require('gulp-eslint'),
    scsslint = require('gulp-scss-lint'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    iisexpress = require('gulp-serve-iis-express'),
    // Package Control
    package = require('./package.json');

var paths = {
  base: {
     src: './_src',
     dest: './_dist'
  },
  css: {
    src:'./_src/sass',
    dest:'./_dist/Assets/css'
  },
  html: {
    src:'./_src/pages/**/*',
    dest:'./_dist'
  },
  inc: {
    src:'./_src/inc/**/*',
  },
  img: {
    src:'./_src/img/**/*',
    dest:'./_dist/Assets/img/'
  },
  // pdf: {
  //   src:'./_src/pdf/**/*',
  //   dest:'./_dist/pdf/'
  // },
  // fonts: {
  //   src:'./_src/fonts/**/*',
  //   dest:'./_dist/Assets/fonts/'
  // },
  // video: {
  //   src:'./_src/video',
  //   dest:'./_dist'
  // },
  js: {
    // header : [
    //   './_src/js/vendor/modernizr.min.js'
    // ],
    footer : [
      './_src/js/vendor/jquery.min.js',
      './_src/js/vendor/jquery.slimscroll.min.js',
      './_src/js/vendor/jquery.gsap.min.js',
      './_src/js/vendor/CSSPlugin.min.js',
      './_src/js/vendor/EasePack.min.js',
      './_src/js/vendor/TimelineLite.min.js',
      './_src/js/vendor/TweenLite.min.js',
      './_src/js/main.js'
    ],
    dest: './_dist/Assets/js'
  }
}


function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// Clean Process
gulp.task('clean', function() {
  return gulp.src(paths.base.dest)
  .pipe(clean({force: true}))
});

// Build Process
gulp.task('buildCSS', function() {
  gulp.src(paths.css.src + '/main.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(rename(package.name+'-main-'+package.version+'.css'))
  .pipe(gulp.dest(paths.css.dest))
  .pipe(livereload());
});

gulp.task('buildHTML', function() {
  gulp.src(paths.html.src)
  .pipe(include())
  .pipe(replace({
    patterns: [
      {
        match: /Maincss/g,
        replacement: package.name+'-main-'+package.version+'.css'
      },
      // {
      //   match: /Headjs/g,
      //   replacement: package.name+'-header-'+package.version+'.js'
      // },
      {
        match: /Footjs/g,
        replacement: package.name+'-footer-'+package.version+'.js'
      },
    ]
  }))
  .pipe(htmlmin(
    {
      removeComments: true,
      collapseWhitespace: true,
      collapseInlineTagWhitespace: false,
      minifyCSS: true,
      sortClassName: true,
      sortAttributes: true,
      removeEmptyElements: true,
      removeAttributeQuotes: false,
      html5: true
    }))
  .pipe(gulp.dest(paths.html.dest))
  .pipe(livereload());
});

gulp.task('buildJS', function() {
  //header
  // gulp.src(paths.js.header)
  // .pipe(concat(package.name+'-header-'+package.version+'.js'))
  // .pipe(uglify())
  // .pipe(gulp.dest(paths.js.dest))
  // .pipe(livereload());

  // footer
  gulp.src(paths.js.footer)
  .pipe(concat(package.name+'-footer-'+package.version+'.js'))
  // .pipe(uglify())
  .pipe(gulp.dest(paths.js.dest))
  .pipe(livereload());
});

gulp.task('buildImg', function() {
  gulp.src(paths.img.src)
  //.pipe(imagemin())
  .pipe(gulp.dest(paths.img.dest))
  .pipe(livereload());
});

gulp.task('buildMisc', function() {
  // pdf, Fonts, Video or etc
  // you have to add paths if you have additional

  // PDF
  gulp.src(paths.pdf.src)
  .pipe(gulp.dest(paths.pdf.dest));

  // Fonts
  gulp.src(paths.fonts.src)
  .pipe(gulp.dest(paths.fonts.dest));

  // Video
  gulp.src(paths.video.src, { nodir: true })
  .pipe(gulp.dest(paths.video.dest));

  // Mailer
  gulp.src('./_src/mailer/**/*', { nodir: true })
  .pipe(gulp.dest('./_dist/'));

  gulp.src('./_src/mailer/email/**', { nodir: true })
  .pipe(gulp.dest('./_dist/Assets/email/'));
});

// Test
gulp.task('lintJS', function() {
  gulp.src('./_src/js/*.js')
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('default', { verbose: true }))
      .pipe(jshint.reporter('fail'))
      // .pipe(eslint())
      // .pipe(eslint.format())
      // .pipe(eslint.failOnError())
      .on('error', handleError);
});

gulp.task('lintHTML', function() {
  gulp.src(paths.html.src)
  .pipe(include())
  .pipe(htmllint())
  .pipe(w3cjs())
  .pipe(w3cjs.reporter())
  .on('error', handleError);
});

gulp.task('lintCSS', function() {
  gulp.src([paths.css.src + '/**/*', '!./_src/sass/vendor/**/*.scss'])
  .pipe(scsslint({'config': 'scss-lint.yml'}))
  .pipe(scsslint.failReporter())
  .on('error', handleError);
});

// Watch
gulp.task('watch', function () {
  livereload.listen();

  gulp.watch([paths.img.src], ['buildImg', 'buildHTML']);
  gulp.watch([paths.css.src+'/**/*'], ['buildCSS', 'lintCSS']);
  gulp.watch([paths.html.src], ['buildHTML', 'lintHTML']);
  gulp.watch([paths.inc.src], ['buildHTML', 'lintHTML']);
  gulp.watch([paths.js.footer], ['buildJS', 'lintJS']);
});

// Serve
gulp.task('serve', function() {
  connect.server({
    root: '_dist',
    port: 8000
  });
});


gulp.task('connect', function() {
    var configPath = path.join(__dirname, '..\\.vs\\config\\applicationHost.config');

    iisexpress({
        siteNames: ['site'],
        configFile: configPath,
        port: 8005
    });
});


// Build Prod
gulp.task('build', function(){
  runSequence('clean',
              'buildJS',
              'buildHTML',
              'buildCSS',
              'lintJS',
              'lintHTML',
              'lintCSS',
              'buildImg',
              // 'buildMisc'
            );
});
