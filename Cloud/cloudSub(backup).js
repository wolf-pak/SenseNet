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

var msgnr = 0;

var client = mqtt.connect(options)

//MSSQL Connection



// connect to your database


// config for your database
var config = {
  user: 'admin',
  password: 'administrator',
  server: 'localhost',
  database: 'SensorCloudDB'
};

setInterval(function() {
    
// connect to your database
sql.connect(config, function (err) {


  const transaction = new sql.Transaction(/* [pool] */)
  transaction.begin(err => {
      // ... error checks
   
      let rolledBack = false
   
      transaction.on('rollback', aborted => {
          // emited with aborted === true
   
          rolledBack = true
      })
  

      new sql.Request(transaction)
      .query('INSERT INTO SensorState (time, value, node, sensorId) VALUES (\''+new Date().toISOString().slice(0, 19).replace('T', ' ')+'\', \'99\', \'testNode\', \'testSensor\')', (err, result) => {
          // insert should fail because of invalid value
   
          if (err) {
              if (!rolledBack) {
                  transaction.rollback(err => {
                      // ... error checks
                  })
              }
              console.log(err.message)
          } else {
              transaction.commit(err => {
                  // ... error checks
              })
          }
      })
  })
})
sql.close()
}, 2000);
  ////////////////////////////////OLD ATTEMPT
  /*if (err) console.log(err);

  // create Request object
  var request = new sql.Request();

  request.query('INSERT INTO SensorState (time, value, node, sensorId) VALUES ('+new Date()+', 99, testNode, testSensor)', function(err, recordset){
console.log(recordset);

  })
  // query to the database and get the records
  request.query('select * from SensorState', function (err, recordset) {


    
    if (err) {
      console.log(err)
        
      }else{

        


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
      console.log(topic + 'this is topic')
      var top = topic.toString();
      var mess = message.toString();
      console.log('Received message:' + mess);

      //JSON
      var obj = JSON.parse(mess);
      var value = obj.value;
      var time = obj.time_stamp;
      var node = obj.node;
      var sensorId = obj.sensorId;

      //request.query('INSERT INTO SensorState (time, value, node, sensorId) VALUES ('+time+', '+value+','+node+','+sensorId+')')
      //Enters message into DB
      //db.query('INSERT INTO sensorData VALUES(null, ?, ?, ?)', [top, value, time]);
      //console.log('Database: Inserted: ' + value + " from: " + top + ". Recorded at: " + time);}
    })






    // Test printout of whole DB
    console.dir(recordset);
      }



  });

  
});






//Queries the latest DB entry to ensure correct functionality.


//setInterval(function(){
//	console.log('Database printout (latest entry):');
	//db.query('SELECT * FROM sensorData ORDER BY id DESC LIMIT 1;');
//}, 2000);


/* -----Ghost Code ------
db.query ('DROP TABLE sensorData');
db.query('CREATE TABLE IF NOT EXISTS sensorData (id INTEGER PRIMARY KEY AUTOINCREMENT, topic TEXT, value TEXT, time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL )');
db.query('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, value TEXT)');
db.query('INSERT INTO test VALUES(null, ?)', ['some text']);
db.query('SELECT * FROM test');
*/
