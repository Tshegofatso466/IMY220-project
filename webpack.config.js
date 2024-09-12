const path = require("path");

module.exports = {
    entry: "./frontend/src/index.js",
    output: {
        path: path.resolve(__dirname, 'frontend', 'public'),
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'), // Adjust if needed
        compress: true,
        port: 9000, // Or any other port
        hot: true
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',  // Naming pattern for the output files
                            outputPath: 'TempImages/',  // Output directory for images
                        }
                    }
                ]
            }, 
            {
                test: /\.(woff(2)?|ttf|otf|eot)$/,  // Regex to match font file types
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/ExecFonts/[name][ext]',  // Specify the output folder for fonts
                }
            }
        ]
    }
}