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
    var time = new Date();
    var res = time.toString().substring(4, 26);
    msgnr ++;
    
    var sensorArray = [];
    var messageArray = [];
    
    //Gets system temperature
   var sys_temperature = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");    
   if (sys_temperature > 570){
    var temperature = {
        "hostname" : hostname,
        "time" : time,
        "value" : ((sys_temperature/1000).toPrecision(3)),
        "type"  : "temperature",
        "sensorId" : "temperatureOne"
    }
    messageArray.push(JSON.stringify(temperature)); 

    //Påhittad ljussensor som tar värmen
    var sys_light = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");    
    light = {
        "hostname" : hostname,
        "time" : time,
        "value" : ((sys_light/1000).toPrecision(3)),
       "type"  : "light",
       "sensorId" : "lightOne"     
    }
    messageArray.push(JSON.stringify(light)); 

    //Påhittad ljussensor som tar värmen
    var sys_light1 = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");    
    light1 = {
        "hostname" : hostname,
        "time" : time,
        "value" : ((sys_light1/1000).toPrecision(3)),
       "type"  : "light",
       "sensorId" : "lightTwo"  
    }
    messageArray.push(JSON.stringify(light1)); 

    console.log(messageArray);
    //Publishes message
        client.on('connect', function () {
            
        for(i = 0; i < messageArray.length; i++){
            var message = messageArray[i];
            var topic = hostname //+ "/" + message.type + "/" + message.sensorId;
            client.publish(topic, message)
            console.log("--------------------------------------------------------");
            console.log("Nr: " + msgnr + " since start");
        } })
    }	
},2000);