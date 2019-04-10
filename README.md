# SenseNet

Copyright WolfPak

To setup the SenseNet as a running environment follow these steps:

Clone the whole repo to an optional location. All paths should be relative to it's source folders and work out of the box. Critical paths are connection strings and certificate files.

---SETTING UP CLOUD STORAGE INFRASTRUCTURE---

Your computer is simulating the cloud hardware infrastructure.
1. Create a new MS SQL database on your computer named SensorCloudDB. Create a DB user named admin and assign password 'administrator'.
2. Run line 1-5 in SQLQuery_CreateTableAndTData.sql to create a table.
3. Run run line 22-29 in the same file to enable SignalR push notifications.
4. Run SQLQuery_sp_addSensorData.sql to enable stored procedure for adding sensor data.
5. Run SQLQuery_sp_getSensorData.sql to enable retrieving all data.

---START MQTT COMMUNICATION WITHIN SENSENET---

6. Power up the broker (referred to as 'Bill'). This will automatically start the mosquitto broker service after bootup is complete.
7. Power up any other RPi (such as 'Joe' or 'Dick'). Once booted their preconfigured scripts will autorun and start sending messages to Bill.

---SUBSCRIBE AND STORE DATA FROM SENSENET---

8. Make sure your computer is connected to the broker (Bill) via ethernet cable. Connectivity can be checked by accesing the broker via Putty (https://www.putty.org/) using SSH on Bill.local. SSH passwords are set to 'Raspberry' on all RPis.
9. Download and install NodeJS for your computer (https://nodejs.org/en/download/).
10. Run cloudSub.js to start subscribing to all messages from the broker and storing them to your Database.

---VISUALIZING RETRIEVED AND STORED DATA---

11. Run SenseNetClient.sln in Visual Studio and Run application (tested in Chrome and Mozilla).

---OPTIONAL FEATURES---

O1. The broker have a script located in /home/pi/main.js. This could be run by SSH-accessing the RPi and running:
sudo node main.js
The script will start subscirbing to all topics retreived by it's own broker and storing it to a DBLite Database, which could be further developed to be used as a backup for internet malfunction.

