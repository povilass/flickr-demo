const assetsPath = '/assets/processed/fonts';

module.exports = {
    module: {
        rules: [
            {
                test: /\.(woff|woff2)(\?[a-z0-9#=&.]+)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        useRelativePath: true,
                        outputPath: assetsPath,
                        publicPath: assetsPath,
                    }
                },
            }
        ],
    }
};
