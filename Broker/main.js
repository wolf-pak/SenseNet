
console.log("Successfuly launched script.");      

//Init
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt:localhost')
var dblite = require('dblite'),
    db = dblite('brokerDB.db');

//Connect
client.on('connect', function () {
  client.subscribe('#', function (err) {
    if (!err) {
     console.log("Connection sucessful: Currently subscribing to #");
    }
  })
})

//Empty DB
db.query ('DROP TABLE sensorData');
db.query('CREATE TABLE IF NOT EXISTS sensorData (id INTEGER PRIMARY KEY AUTOINCREMENT, topic TEXT, value TEXT, time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL )');

//On Message recieved
client.on('message', function (topic, message) {
	var top = topic.toString();
	var mess = message.toString();

  //JSON
  var obj = JSON.parse(mess);
  var value = obj.value;
  var time = obj.time_stamp;


  var res = time.toString().substring(4, 26);
  console.log("--------------------------------------------------------");
  console.log('Received message:'+ "Recieved: " + value + "   |   " + top + "   |   " + res);


  //Enters message into DB
 	db.query('INSERT INTO sensorData VALUES(null, ?, ?, ?)', [top, value, time]);
   console.log("Insert: OK");
   console.log("--------------------------------------------------------");

})

//Queries the latest DB entry to ensure correct functionality.
setInterval(function(){
	console.log('Database printout (latest entry):');
  let sql = `SELECT * FROM sensorData;`;

db.all(sql, [], (err, rows) => {
if (err) {
throw err;
}
rows.forEach((row) => {
 console.log(row.id + "   |   " + row.topic + "   |   " + row.value + "   |   " +   row.time.toString());
});
});
}, 2000);
/* -----Ghost Code ------
db.query('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, value TEXT)');
db.query('INSERT INTO test VALUES(null, ?)', ['some text']);
db.query('SELECT * FROM test');
*/
