'use strict'
console.log("Successfuly launched script.");
var os = require("os");
var hostname = os.hostname();
var mqtt = require('mqtt')
var fs = require('fs');
//var path = require('path')
//var clientoptions = fs.readFileSync(path.join("/home/nodejs","/clientoptions.js"))
var clientoptions = require('/home/client/clientoptions');

var options = clientoptions.fetchoptions();
var msgnr = 0;
var messageArray = [];


function SensorState(value, type, sensorId, time) {
    this.hostname = hostname;
    this.time = time;
    this.value = value;
    this.type = type;
    this.sensorId = sensorId;
}

var temperature = new SensorState(0, "temperature", "temperatureOne", new Date());
messageArray.push(temperature);

var light1 = new SensorState(0, "light", "lightOne", new Date());
messageArray.push(light1);

var light2 = new SensorState(0, "light", "lightTwo", new Date());
messageArray.push(light2);

var temperature2 = new SensorState(0, "temperature", "temperatureTwo", new Date());
messageArray.push(temperature2);

var client = mqtt.connect(options);  //client.tls_set("/etc/mosquitto/ca_certificates/ca.crt")

// if (sys_temperature > 570){   //}	

console.log("Utanför Connectmetoden.");
//Publishes message
client.on('connect', function (err) {
    console.log("Innanför Connectmetoden.");

    setInterval(function () {

        msgnr++;

        for (var i = 0; i < messageArray.length; i++) {
            switch (messageArray[i].type) {
                case "temperature":
                    var sys_temperature = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");
                    var tempTemperature = ((sys_temperature / 1000).toPrecision(3));
                    messageArray[i].value = tempTemperature;
                    messageArray[i].time = new Date();
                    break;
                case "light":
                    var sys_light = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");
                    var tempLight = ((sys_light / 1000).toPrecision(3));
                    messageArray[i].value = tempLight;
                    messageArray[i].time = new Date();
                    break;
                default:
                    break;
            }

            var message = messageArray[i];
            var topic = hostname + "/" + message.type + "/" + message.sensorId;
            client.publish(topic, JSON.stringify(message))

            console.log("--------------------------------------------------------");
            console.log("Sucessfully sent: " + JSON.stringify(message.value) + "     |     " + new Date().toString().substring(4, 26));
            console.log("Nr: " + msgnr + " since start " + message.time);
        }

    }, 8000);
})

