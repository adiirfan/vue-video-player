module.exports = {
    // options...
    baseUrl: process.env.NODE_ENV === 'production' ? '/video/' : '/',

    // Other options include:
    outputDir: undefined,
    assetsDir: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: undefined,
    parallel: undefined,
    css: undefined
}