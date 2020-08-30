module.exports = {
    // entry: "./src/index.ts",
    // output: {
    //     path: __dirname + "/dist",
    //     filename: "bundle.js"
    // },
    module: {
        rules: [
            {
                exclude: /node_modules/, // files to be ignored
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    mode: "production"
    // stats: {
    //     colors: true
    // },
    // devtool: "source-map"
};
