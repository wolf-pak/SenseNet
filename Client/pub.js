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
    
    var messageArray = [];

    function Sensor(value, type, sensorId) {
        this.hostname = hostname;
        this.time = time;
        this.value = value;
        this.type = type;
        this.sensorId = sensorId;
    }
    
    //Gets system temperature
   var sys_temperature = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");    
   if (sys_temperature > 570){
    var sys_temperature = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");    
    var temperature = new Sensor(((sys_temperature/1000).toPrecision(3)), "light", "lightOne")
    messageArray.push(temperature); 

    //Påhittad ljussensor som tar värmen
    var sys_light = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");    
    var light = new Sensor(((sys_light/1000).toPrecision(3)), "light", "lightOne")
    messageArray.push(light); 

    //Påhittad ljussensor som tar värmen
    var sys_light1 = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");    
    var light1 = new Sensor(((sys_light1/1000).toPrecision(3)), "light", "lightTwo")
    messageArray.push(light1); 


    //console.log(messageArray);
    //Publishes message
        client.on('connect', function () {
            
        for(i = 0; i < messageArray.length; i++){
            var message = messageArray[i];
            var topic = hostname + "/" + message.type + "/" + message.sensorId;
            client.publish(topic, JSON.stringify(message))
            console.log("--------------------------------------------------------");
            console.log("Sucessfully sent: " + JSON.stringify(message.value) + "     |     " + res);
            console.log("Nr: " + msgnr + " since start");
        } })
    }	
},2000);