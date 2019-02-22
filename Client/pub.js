console.log("Successfuly launched script."); 
var msgnr = 0;     
setInterval(function(){
    //gets hostname for topic
    var os = require("os");
    var hostname = os.hostname();
    //Initializes mqtt
    var mqtt = require('mqtt')
    var client  = mqtt.connect('mqtt:192.168.4.1')
    var fs =  require('fs');
    msgnr ++;
    
    //Gets system temperature
   var sys_temperature = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");    
   if (sys_temperature > 570){
    temperature = ((sys_temperature/1000).toPrecision(3));
    var time = new Date();
    var res = time.toString().substring(4, 26);

    //Json
    var message = { 
        "value"  :  temperature, 
        "time_stamp"   :  time
      }

    //Publishes message
        client.on('connect', function () {
        client.publish(hostname, JSON.stringify(message)) })
        console.log("--------------------------------------------------------");
        console.log("Sucessfully sent: " + message.value + "     |     " + res);
        console.log("Nr: " + msgnr + " since start");

    }	
    },2000);
