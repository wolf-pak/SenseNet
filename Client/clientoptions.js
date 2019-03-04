var fs =  require('fs');
var path = require('path')
var KEY = fs.readFileSync(path.join("/home/nodejs", "/client.key"))
var CERT = fs.readFileSync(path.join("/home/nodejs","/client.crt"))
var TRUSTED_CA_LIST = fs.readFileSync(path.join("/home/nodejs", "/ca.srl"))

//var clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

var PORT = 8883 // 8883
var HOST = '192.168.4.1' //Bill

var options = {
    //clientId : clientId,
    username : 'Jan',
    password : 'raspberry',
    port: PORT,
    host: HOST,
    key: KEY,
    cert: CERT,
    rejectUnauthorized: false,
    // The CA list will be used to determine if server is authorized
    ca: TRUSTED_CA_LIST,
    protocol: 'mqtts'
}

module.exports = {
    fetchoptions: function getOptions () {
        return options;
    }
}

