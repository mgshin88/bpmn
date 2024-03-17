const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
require('dotenv').config();

module.exports = {
    name: 'bpmn-webpack-setting',
    entry: './src/index.lib.js',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true, // Prevents the mangling of class names
                    keep_fnames: true // Prevents the mangling of function names
                }
            }),
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@common': path.resolve(__dirname, 'src/common/'),
            '@recoils': path.resolve(__dirname, 'src/recoils/'),
            '@apis': path.resolve(__dirname, 'src/apis/'),
            '@components': path.resolve(__dirname, 'src/components/'),
            '@styles': path.resolve(__dirname, 'src/styles/')
        },
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer/")
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // 번들 파일이 저장될 경로
        publicPath: '/',
        filename: 'bpmn-webpack.bundle.js', // 번들 파일 이름
        library: 'bpmn-concplay', // 전역 변수로 노출될 라이브러리 이름
        libraryTarget: 'umd', // 모듈 시스템 (UMD는 CommonJS와 AMD를 모두 지원)
        globalObject: 'this' // Universal Module Definition를 위한 설정
    },
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'React',
            root: 'React',
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'ReactDOM',
            root: 'ReactDOM',
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                include: path.join(__dirname),
                exclude: /(node_modules)|(dist)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', // 스타일을 DOM에 삽입합니다.
                    {
                        loader: 'css-loader',
                        options: {
                            // modules: true,
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // 스타일을 DOM에 삽입
                    {
                        loader: 'css-loader', // CSS를 CommonJS로 변환
                        options: {
                            // modules: true, // CSS 모듈 활성화
                            sourceMap: true // 소스맵 활성화
                        }
                    },
                    'sass-loader'
                    // {
                    //     loader: 'sass-loader', // SASS를 CSS로 컴파일
                    //     options: {
                    //         implementation: require('sass'),
                    //         sassOptions: {
                    //             outputStyle: 'compressed',
                    //         },
                    //         sourceMap: true
                    //     }
                    // }
                ]
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }
            },
            // {
            //     test: /\.xml$/,
            //     use: {
            //         loader: 'xml-loader'
            //     }
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL)
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        // new webpack.EnvironmentPlugin(["API_BASE_URL"])
    ],
    devServer: {
        hot: true,
        historyApiFallback: true
    }
};