console.log("Successfuly launched script.");

//Imports////////////////////////////////////////
//gets hostname for topic
var os = require("os");
var hostname = os.hostname();

//Initializes mqtt
var mqtt = require('mqtt')
var fs = require('fs');
var path = require('path')

//Initialize MS SQL
const sql = require('mssql')

////////////////////////////////////////////////

class Service{

  constructor(){

//MQTT Cert
      var KEY = fs.readFileSync(path.join("C:/Users/Phili/OneDrive/Documents/GitHub/SenseNet/Cert/Client", "/client.key"))
      var CERT = fs.readFileSync(path.join("C:/Users/Phili/OneDrive/Documents/GitHub/SenseNet/Cert/Client", "/client.crt"))
      var TRUSTED_CA_LIST = fs.readFileSync(path.join("C:/Users/Phili/OneDrive/Documents/GitHub/SenseNet/Cert", "/ca.srl"))

//MQTT Connection options
this.options = {
  //clientId : clientId,
  username: 'Jan',
  password: 'raspberry',
  port: 8883,
  host: '192.168.4.1',
  key: KEY,
  cert: CERT,
  rejectUnauthorized: false,
  // The CA list will be used to determine if server is authorized
  ca: TRUSTED_CA_LIST,
  protocol: 'mqtts'
}

    this.topic = '#'

//DB Connection Config
this.config = {
  user: 'admin',
  password: 'administrator',
  server: 'localhost',
  database: 'SensorCloudDB'
};

  }


  async start(){

    //Connect to MSSQL
      var connection = await sql.connect(this.config);
      console.log('starting MSSQL');
      

    //Connect MQTT
    var client = mqtt.connect(this.options)
    //var client = await mqtt.connect('mqtt://broker.mqttdashboard.com')
    console.log(client)

    client.on('connect', function () {
        console.log('MQTT-Client Connected')
     

      client.subscribe('#', function(err){
        if (!err) {
          console.log('Subscribing on #');
        }
      })

    })
    client.on('message', async function (topic, message) {
        console.log('Received message on topic: ' + topic) 
        
        console.log('running Stored proc')

        try {
         
           // Stored procedure
           let pool = connection;

            let result2 = await pool.request()
               .execute('getSensorData')
           
           //console.dir(result2)
          
  //JSON
  var obj = JSON.parse(message.toString());
           
           let result1 = await pool.request()
           .input('time', sql.DateTime, new Date(/*obj.time*/))
           .input('value', sql.VarChar, obj.value)
           .input('type', sql.VarChar, obj.type)
           .input('node', sql.VarChar, obj.hostname)
           .input('sensorID', sql.VarChar, obj.sensorId)
               .execute('addSensorData')
           
           console.dir(result1)
  
           
        } catch (err) {
          console.log(err)
            // ... error checks
        }
    })   
  }
/*
  async runStoredProcedure(obj) {
    //console.log('running Stored proc')

      try {
      
          // Stored procedure
          let pool = this.connection;
          let result1 = await pool.request()
          .input('time', sql.DateTime, new Date(obj.time))
          .input('value', sql.VarChar, obj.value)
          .input('node', sql.VarChar, obj.hostname)
          .input('sensorID', sql.VarChar, obj.sensorId)
              .execute('addSensorData')
          
          console.dir(result1)
      } catch (err) {
        console.log(err)
          // ... error checks
      }
  }

    fetchData() {
    console.log('running Stored proc')

      try {
       
         // Stored procedure
         let pool = this.connection;
         let result2 = pool.request()
             .execute('getSensorData')
         
         console.dir(result2)
        



         
      } catch (err) {
        console.log(err)
          // ... error checks
      }
    }
    */

}

(async () => {
  const service = new Service();
  await service.start();
})();



//PROMISE
/*
const pool2 = new sql.ConnectionPool(config, err => {
  // ... error checks
  console.log('Pool Error: ' + err)
});

pool2.on('error', err => {
  // ... error handler
  console.log('Pool Error2: ' + err)
})
*/

//On Message recieved


  //request.query('INSERT INTO SensorState (time, value, node, sensorId) VALUES ('+time+', '+value+','+node+','+sensorId+')')
  //Enters message into DB
  //db.query('INSERT INTO sensorData VALUES(null, ?, ?, ?)', [top, value, time]);
  //console.log('Database: Inserted: ' + value + " from: " + top + ". Recorded at: " + time);}





/*
  return pool2.then((pool) => {
    pool.request() // or: new sql.Request(pool2)
    .input('time', sql.DateTime, new Date(obj.time))
      .input('value', sql.VarChar, obj.value)
      .input('node', sql.VarChar, obj.hostname)
      .input('sensorID', sql.VarChar, obj.sensorId)
    .execute('addSensorData', (err, result) => {
        // ... error checks
        console.dir(err + result)
    })
});

/*
  /*
  new sql.ConnectionPool(config).connect().then(pool => {
    console.log(obj)
    return pool.query`INSERT INTO SensorState (time, value, node, sensorId) VALUES ('20120618 10:34:09 AM', '${obj.value}', '${obj.node}', '${obj.sensorId}')`
}).then(result => {
    console.dir(result)
}).catch(err => {
    // ... error checks
})

*/
  /*
  return pool2.then((pool) => {
      pool.request() // or: new sql.Request(pool2)
      .input('time', sql.DateTime, new Date().toISOString().slice(0, 19).replace('T', ' '))
      .input('value', sql.VarChar, 'test')
      .input('node', sql.VarChar, 'testnode')
      .input('sensorID', sql.VarChar, 'testsens')


      .output('output_parameter', sql.VarChar(50))
      .execute('addSensorData', (err, result) => {
          // ... error checks
          console.dir(result)
      })
  });*/


/*
  var connection = new sql.ConnectionPool(config, function (err) {
    console.log('Connection Error')

    const transaction = new sql.Transaction(/* [pool] *//*)
    console.log(transaction)
    transaction.begin(err => {
      // ... error checks
      console.log('error')
      let rolledBack = false

      transaction.on('rollback', aborted => {
        // emited with aborted === true
        console.log('rollback')
        rolledBack = true
      })


      new sql.Request(transaction)
        .query('INSERT INTO SensorState (time, value, node, sensorId) VALUES (\'' + new Date().toISOString().slice(0, 19).replace('T', ' ') + '\', \'99\', \'testNode\', \'testSensor\')', (err, result) => {
          // insert should fail because of invalid value
          console.log('eller hit?')
          if (err) {
            if (!rolledBack) {
              transaction.rollback(err => {
                // ... error checks
                console.log('error1')
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
  
})//END MQTT Message Recieve

/*
// create Request object
var request = new sql.Request();

request.query('INSERT INTO SensorState (time, value, node, sensorId) VALUES (' + new Date() + ', 99, testNode, testSensor)', function (err, recordset) {
  console.log(recordset);

})
// query to the database and get the records
request.query('select * from SensorState', function (err, recordset) {








  // Test printout of whole DB
  console.dir(recordset);
})











/*

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