/**
 * Class name change when the file is minified (add section chainWebpack)
 * https://github.com/vuejs/vue-cli/issues/1118#issuecomment-592743751
 */
module.exports = {
    publicPath: './',
    chainWebpack: config => {
        config.optimization
            .minimizer('terser')
            .tap(args => {
                const { terserOptions } = args[0]
                terserOptions.keep_classnames = true
                terserOptions.keep_fnames = true
                return args
            })
    },
}
