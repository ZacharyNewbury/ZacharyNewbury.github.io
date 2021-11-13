var http = require('http');
const https = require('https');
var fs = require('fs');
const express = require('express');


const app = new express();

const privateKey = fs.readFileSync('/etc/letsencrypt/live/buddybot.ca/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/buddybot.ca/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/buddybot.ca/chain.pem', 'utf8');
const options ={key:privateKey,cert:certificate};


app.use(express.static("/home/zack/website/dist", { dotfiles: 'allow' }));


app.get('/', function(request, response){
    response.sendFile('/home/zack/website/dist/index.html');
});

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

httpServer.listen(80, () => {
    console.log(`express running → PORT ${httpServer.address().port}`);
});

httpsServer.listen(443, () => {
    console.log(`express running → PORT ${httpsServer.address().port}`);
});