let mix = require('laravel-mix');
require('laravel-mix-bundle-analyzer');

if (!mix.inProduction()) {
    mix.bundleAnalyzer();
}

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/assets/js/app.js', 'public/js').sass(
    'resources/assets/sass/app.scss',
    'public/css'
).version();

mix.extract();

mix.webpackConfig({
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'resources/assets/js'),
        },
    },
});
