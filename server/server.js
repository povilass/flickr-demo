const path = require('path');
const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const dotenv = require('dotenv');
const {URLSearchParams} = require('url');
const app = express();

//FOR now applying always but in PRODUCTION this file won't be needed because that env should have those parameters.
dotenv.config({ path : '.env.development'});

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '..', 'dist');
const staticPath = path.join(__dirname, '..', 'dist', 'static');


const security = {
    //CSP and other security vulnerabilities
    use: true,
    headers: {
        "Content-Security-Policy": "default-src 'self'; frame-ancestors 'none'; img-src 'self' data:; style-src 'self'; font-src 'self' data:",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "deny",
        "X-XSS-Protection": "1; mode=block",
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
        "Cache-Control": "no-cache"
    }
};

const appendSecurityHeadersIfNeeded = (security = {}, response) => {
    if (!security.use) {
        return;
    }

    const {headers = {}} = security;

    Object.keys(headers).map((key) => {
        response.setHeader(key, headers[key]);
    });
};

app.use("/static", express.static(staticPath, {
    fallthrough: false,
    setHeaders: function (res, path) {
        appendSecurityHeadersIfNeeded(security, res);
    }
}));

app.use(express.static(publicPath));


app.use('/flickr/api', createProxyMiddleware({
    target: process.env.FLICKR_API_URL,
    changeOrigin: true,
    xfwd: true,
    secure: false,
    logLevel: 'debug',
    pathRewrite: function (path) {
        return path.replace("/flickr/api", "");
    },
    onProxyReq(proxyReq, req, res) {
        if(proxyReq.method === 'GET') {
            const [pathname, query] = proxyReq.path.split('?');
            const searchParams = new URLSearchParams(query);
            searchParams.append('api_key', process.env.FLICKR_API_KEY);
            proxyReq.path = `${pathname}?${searchParams.toString()}`;
        }
    },
}));

app.get('*', (req, res) => {
    appendSecurityHeadersIfNeeded(security, res);
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is up! Port ${port}, pid ${process.pid}`);
});
