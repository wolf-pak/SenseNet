/*var mqtt = require('mqtt');

var hostname = 'broker.mqttdashboard.com';
var port = 8000;
var clientid = 'clientId-l7nbt8dUrb';


//Create a new Client object with your broker's hostname, port and your own clientId
var client = mqtt.connect(hostname);

var options = {

     //connection attempt timeout in seconds
     timeout: 3,

     //Gets Called if the connection has successfully been established
     onSuccess: function () {
         alert("Connected");
     },

     //Gets Called if the connection could not be established
     onFailure: function (message) {
         alert("Connection failed: " + message.errorMessage);
     }

 };

//Attempt to connect
client.connect(options);




//publish
var payload = "testload";

var message = new Messaging.Message(payload);
message.destinationName = topic;
message.qos = qos;
client.send(message);
*/



var mqtt    = require('mqtt');

/*
var options = {
    host: 'mqtt://broker.mqttdashboard.com',
    port: 8000,
    clientId: 'clientId-l7nbt8dUrb',
    username: 'myuser',
    password: 'mypassword'
  };
  */


var client  = mqtt.connect('mqtt://broker.mqttdashboard.com');

client.on('connect', function(){
	console.log('Connected');
});


var topic = 'testtopic/2';
var message = 'Current time is:' + new Date();

client.publish(topic, message);