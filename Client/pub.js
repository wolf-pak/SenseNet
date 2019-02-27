console.log("Successfuly launched script."); 
var msgnr = 0;     
setInterval(function(){
    //gets hostname for topic
    var os = require("os");
    var hostname = os.hostname();
    //Initializes mqtt
    var mqtt = require('mqtt')
    var fs =  require('fs');
    var path = require('path')
    var KEY = fs.readFileSync(path.join(__dirname, '..', '..', 'test', 'helpers', 'tls-key.pem'))
    var CERT = fs.readFileSync(path.join(__dirname, '..', '..', 'test', 'helpers', 'tls-cert.pem'))
    var TRUSTED_CA_LIST = fs.readFileSync(path.join(__dirname, '/crt.ca.cg.pem'))

    var PORT = 1883
    var HOST = '192.168.4.1'
  
    var options = {
        port: PORT,
        host: HOST,
        key: KEY,
        cert: CERT,
        rejectUnauthorized: false,
        // The CA list will be used to determine if server is authorized
        ca: TRUSTED_CA_LIST,
        protocol: 'mqtts'
    }
    
    var client  = mqtt.connect(options)  //'mqtt:192.168.4.1'

    msgnr ++;

    var time = new Date();
    var res = time.toString().substring(4, 26);
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
        
        client.tls_set("/etc/mosquitto/ca_certificates/ca.crt")

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