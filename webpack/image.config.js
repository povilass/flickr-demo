const assetsPath = '/assets/processed/images';

module.exports = {
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|ico|svg)$/i,
                use: [
                    {
                        loader : 'file-loader',
                        options : {
                            name : '[name].[ext]',
                            limit : 10000,
                            outputPath : assetsPath,
                            publicPath : assetsPath
                        }
                    },
                    {
                        loader : 'img-loader',
                        options : {
                            outputPath : assetsPath,
                            publicPath : assetsPath
                        }
                    },
                ]
            },
        ],
    },
};
