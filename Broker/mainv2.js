
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt:localhost')

var dblite = require('dblite'),
    db = dblite('brokerDB.db');




client.on('connect', function () {
  client.subscribe('#', function (err) {
    if (!err) {
     console.log("Error: Unable to connect or subscribe.");
    }
  })
})
/*
db.query ('DROP TABLE sensorData');
db.query('CREATE TABLE IF NOT EXISTS sensorData (id INTEGER PRIMARY KEY AUTOINCREMENT, topic TEXT, value TEXT, time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL )');
*/

client.on('message', function (topic, message) {
  // message is Buffer
	var top = topic.toString();
	var mess = message.toString();
  console.log('Received message:'+ mess);

  var obj = JSON.parse(mess);
  var value = obj.value;
  var time = obj.time_stamp;

 	db.query('INSERT INTO sensorData VALUES(null, ?, ?, ?)', [top, value, time]);
 	console.log('Database: Inserted: ' + value + " from: " + top + ". Recorded at: " + time);
})


setInterval(function(){

	console.log('Database printout (latest entry):');
	db.query('SELECT * FROM sensorData ORDER BY id DESC LIMIT 1;');
}, 2000);
/*
db.query('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, value TEXT)');
db.query('INSERT INTO test VALUES(null, ?)', ['some text']);
db.query('SELECT * FROM test');
*/