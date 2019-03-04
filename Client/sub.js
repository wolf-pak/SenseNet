console.log("Successfuly launched script.");      

//Init
    //Initializes mqtt
    var mqtt = require('mqtt')
    var fs =  require('fs');
    var path = require('path')
    var KEY = fs.readFileSync(path.join("/home/nodejs", "/client.key"))
    var CERT = fs.readFileSync(path.join("/home/nodejs","/client.crt"))
    var TRUSTED_CA_LIST = fs.readFileSync(path.join("/home/nodejs", "/ca.srl"))

    //var clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)


var dblite = require('dblite'),
  db = dblite('/home/broker/brokerDB.db');

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
    
  var client  = mqtt.connect(options)

//Connect
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
  var value = obj.value;
  var time = obj.time_stamp;

  //Enters message into DB
 	db.query('INSERT INTO sensorData VALUES(null, ?, ?, ?)', [top, value, time]);
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