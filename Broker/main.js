console.log("Successfuly launched script.");      

//Init
var mqtt = require('mqtt')
var dblite = require('dblite')
var fs = require('fs')
var path = require('path')
var db = dblite('brokerDB.db')

//Certs
var KEY = fs.readFileSync(path.join("/home/pi/Cert/Client", "/client.key"))
var CERT = fs.readFileSync(path.join("/home/pi/Cert/Client", "/client.crt"))
var TRUSTED_CA_LIST = fs.readFileSync(path.join("/home/pi/Cert", "/ca.srl"))

//MQTT Options
var options = {
  //clientId : clientId,
  username: 'Jan',
  password: 'raspberry',
  port: 8883,
  host: 'bill.local',
  key: KEY,
  cert: CERT,
  rejectUnauthorized: false,
  // The CA list will be used to determine if server is authorized
  ca: TRUSTED_CA_LIST,
  protocol: 'mqtts'
}

//Connect
var client  = mqtt.connect(options)

//On Connect Event
client.on('connect', function () {
  client.subscribe('#', function (err) {
    if (!err) {
     console.log("Connection sucessful: Currently subscribing to #");
    }
  })
})

//On Message recieved
client.on('message', function (topic, message) {
	var top = topic.toString();
	var mess = message.toString();
  console.log('Received message:'+ mess);

  //JSON
  var obj = JSON.parse(mess);
  var time = obj.time;
  var value = obj.value;
  var node = obj.hostname;
  var type = obj.type;
  var sensorId = obj.sensorId;

  //Enters message into DB
 	db.query('INSERT INTO sensorData VALUES(null, ?, ?, ?, ?, ?)', [time, value, node, type, sensorId]);
 	console.log('Database: Inserted: ' + value + " from: " + top + ". Recorded at: " + time);
})

//Queries the latest DB entry to ensure correct functionality.
setInterval(function(){
	console.log('Database printout (latest entry):');
	db.query('SELECT * FROM sensorData ORDER BY id DESC LIMIT 1;');
}, 2000);
/* -----Ghost Code ------
db.query ('DROP TABLE sensorData');
db.query('CREATE TABLE IF NOT EXISTS sensorData (id INTEGER PRIMARY KEY AUTOINCREMENT, topic TEXT, value TEXT, time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL )');
db.query('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, value TEXT)');
db.query('INSERT INTO test VALUES(null, ?)', ['some text']);
db.query('SELECT * FROM test');
*/
