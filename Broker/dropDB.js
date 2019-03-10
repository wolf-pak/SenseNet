var dblite = require('dblite'),
    db = dblite('brokerDB.db');


//db.query ('DELETE FROM sensorData');
db.query ('DROP TABLE sensorData');
db.query('CREATE TABLE IF NOT EXISTS sensorData (id INTEGER PRIMARY KEY AUTOINCREMENT, time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, value TEXT, type TEXT, node TEXT, sensorId TEXT)');

var resultSet = db.query('SELECT * FROM sensorData', function(err, rows){
if (err){
console.log(err.message);
} else if(rows == 0){
console.log('sensorData table was recreated');
}



});

if(!resultSet){
console.log('sensorData was recreated')
}
