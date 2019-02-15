setInterval(function(){
    //gets hostname for topic
    var os = require("os");
    var hostname = os.hostname();
    //Initializes mqtt
    var mqtt = require('mqtt')
    var client  = mqtt.connect('mqtt:192.168.4.1')
    var fs =  require('fs');
    
    //Gets system temperature
   var sys_temperature = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");    
   if (sys_temperature > 57000){
    temperature = ((sys_temperature/1000).toPrecision(3));
    var time = new Date();

    //Json
    var message = { 
        "value"  :  temperature, 
        "time_stamp"   :  time
      }
    //Publishes message
        client.on('connect', function () {
        client.publish(hostname, message) })
        console.log(JSON.stringify(message));      
    }	
    },2000);