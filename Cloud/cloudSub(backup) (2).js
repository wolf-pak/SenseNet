console.log("Successfuly launched script.");

//Init
//gets hostname for topic
var os = require("os");
var hostname = os.hostname();
//Initializes mqtt
var mqtt = require('mqtt')
var fs = require('fs');
var path = require('path')
//Initialize MS SQL
const sql = require('mssql')

var KEY = fs.readFileSync(path.join("/Users/Joseph/source/repos/SenseNet/Cert/Client", "/client.key"))
var CERT = fs.readFileSync(path.join("/Users/Joseph/source/repos/SenseNet/Cert/Client", "/client.crt"))
var TRUSTED_CA_LIST = fs.readFileSync(path.join("/Users/Joseph/source/repos/SenseNet/Cert", "/ca.srl"))

//var clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)


//MQTT COnnection Config
var PORT = 8883 // 8883
var HOST = 'bill.local' //Bill


var options = {
  //clientId : clientId,
  username: 'Jan',
  password: 'raspberry',
  port: PORT,
  host: HOST,
  key: KEY,
  cert: CERT,
  rejectUnauthorized: false,
  // The CA list will be used to determine if server is authorized
  ca: TRUSTED_CA_LIST,
  protocol: 'mqtts'
}



//Connect MQTT
var client = mqtt.connect(options)
//var client = mqtt.connect('mqtt://broker.mqttdashboard.com')


client.on('connect', function () {


  client.subscribe('#', function (err) {
    if (!err) {
      console.log("Connection sucessful: Currently subscribing to #");
    }
  })

})


//DB Connection Config
var config = {
  user: 'admin',
  password: 'administrator',
  server: 'localhost',
  database: 'SensorCloudDB'
};



//On Message recieved
client.on('message', function (topic, message) {
  console.log(topic + 'this is topic')
  var top = topic.toString();
  var mess = message.toString();
  //console.log('Received message:' + mess);

  //JSON
  var obj = JSON.parse(mess);

  runStoredProcedure(obj)

})

async function runStoredProcedure(obj) {

  
    try {

      // Stored procedure
      let pool = await sql.connect(config)
      let result2 = await pool.request()
        .input('time', sql.DateTime, new Date(obj.time))
        .input('value', sql.VarChar, obj.value)
        .input('node', sql.VarChar, obj.hostname)
        .input('sensorID', sql.VarChar, obj.sensorId)
        .execute('addSensorData')

      console.dir(result2)
    } catch (err) {
      console.log(err)
      // ... error checks
    }
  

  sql.on('error', err => {
    // ... error handler
  })

}
