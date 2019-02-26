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
    
    var sensorArray = [];
    var messageArray = [];
    
    //Gets system temperature
   var sys_temperature = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");    
   if (sys_temperature > 570){
    temperature = {
        "value" : ((sys_temperature/1000).toPrecision(3)),
        "type"  : "temperature",
        "sensorId" : "temperatureOne"
    }
    sensorArray.push(temperature); 

    //Påhittad ljussensor som tar värmen
    var sys_light = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");    
    light = {
       "value" : ((sys_light/1000).toPrecision(3)),
       "type"  : "light",
       "sensorId" : "lightOne"     
    }
    sensorArray.push(light); 

    //Påhittad ljussensor som tar värmen
    var sys_light1 = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");    
    light1 = {
       "value" : ((sys_light1/1000).toPrecision(3)),
       "type"  : "light",
       "sensorId" : "lightTwo"  
    }
    sensorArray.push(light1); 
     
    var time = new Date();
    var res = time.toString().substring(4, 26);

    
    for(i = 0; i < sensorArray.length; i++){
        var message = { 
            "hostname" : hostname,
            "value"  :  sensorArray[i].value, 
            "time_stamp"   :  time,
            "type" : sensorArray[i].type,
            "sensorId" : sensorArray[i].sensorId
        }
        messageArray.push(message);
    }

    console.log(messageArray);
    //Publishes message
        client.on('connect', function () {
            
        for(i = 0; i < messageArray; i++){
            var message = messageArray[i];
            var topic = hostname //+ "/" + message.type + "/" + message.sensorId;

           
            client.publish(topic, JSON.stringify(message))
            console.log("--------------------------------------------------------");
            console.log("Sucessfully sent: " + message.value + "     |     " + res);
            console.log("Nr: " + msgnr + " since start");
        } })
    }	
},2000);
