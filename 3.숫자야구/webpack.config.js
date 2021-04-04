const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')

// 웹팩을 쓰는 이유는 html에 script가 너무 많아지면
// 관리하기도 어렵고 오류가 생기기도 쉽다
// 그래서 script들을 하나로 합치기 위해 사용한다
// const { Module } = require("webpack");
// Module.exports = {
module.exports = {
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.vue']
    },
    // script 들의 대표가 되는 파일
    entry: {
        // script 들이 하나로 합쳐질 파일의 이름이 app
        // main.js 외에 script 들이 추후 app.js로 합쳐진다
        app: path.join(__dirname, 'main.js'),
    },
    // webpack의 핵심
    module: {
        rules: [{
            test: /\.vue$/,
            // loader도 가능하고 use도 가능
            // loader: 'vue-loader',
            use: 'vue-loader',
        }],
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    output: {
        // [name] 으로 설정하면 알아서 entry의 app이 들어간다
        filename: '[name].js',
        // 혹은 그냥 filename: 'app.js' 이렇게 하면 된다
        path: path.join(__dirname, 'dist'),
    },
}