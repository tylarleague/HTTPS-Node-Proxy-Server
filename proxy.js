#!/usr/bin/env node
const httpProxy = require('http-proxy');
const fs = require('fs')
const key = fs.readFileSync('./localhost/localhost.decrypted.key');
const cert = fs.readFileSync('./localhost/localhost.crt');
const cors = require('cors')

const proxy = httpProxy.createServer({
    ssl: {
        key: key,
        cert: cert
    },
    // changeOrigin: true,
    target: 'https://api-develop.source-elements.com',
    secure: false, // Depends on your needs, could be false.
})

proxy.on('proxyRes', (proxyRes, req, res) => {
    cors()(req, res, () => {})
})
proxy.listen(443, '0.0.0.0');