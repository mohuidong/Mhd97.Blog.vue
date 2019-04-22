module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.1.177:8822',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}