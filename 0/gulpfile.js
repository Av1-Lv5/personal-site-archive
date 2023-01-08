// pug + browserSync
// -----------------

const { src, dest, watch, series } = require("gulp");
const pug = require("gulp-pug");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const browserSync = require("browser-sync").create();

// Build HTML
function buildHTML() {
    return src(["src/index.pug", "src/pages/**/*.pug"], { sourcemaps: true })
        .pipe(pug())
        .pipe(dest("dist"), { sourcemaps: "." });
}

// optimise images
function optimiseImg() {
    return src("src/assets/img/*.png").pipe(dest("dist/assets/img"));
}
// javascript
function js() {
    return src("src/**/*.js").pipe(dest("dist/"));
}

// CSS minification

function cssMinify() {
    return src("src/assets/styles/*.css", { sourcemaps: true })
        .pipe(postcss([cssnano()]))
        .pipe(dest("dist/assets/styles", { sourcemaps: "." }));
}

// browser-sync
function browserSyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: "dist",
        },
    });
    cb();
}

// browser-sync reload
function browserSyncReload(cb) {
    browserSync.reload();
    cb();
}

// watch for changes in .pug, .css files.
function watchTask() {
    watch("src/**/*.pug", series(buildHTML, browserSyncReload));
    watch("src/assets/img/*.png", series(optimiseImg, browserSyncReload));
    watch("src/assets/styles/*.css", series(cssMinify, browserSyncReload));
    watch("src/**/*.js", series(js, browserSyncReload));
}

// Default gulp task
exports.default = series(
    buildHTML,
    cssMinify,
    js,
    optimiseImg,
    browserSyncServe,
    watchTask
);
exports.build = series(buildHTML, cssMinify, optimiseImg, js);
