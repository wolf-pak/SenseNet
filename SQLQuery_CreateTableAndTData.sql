CREATE TABLE SensorState(
	id int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	time datetime NOT NULL,
	value varchar(255) NOT NULL,
	type varchar(255) NOT NULL,
	node varchar(255) NOT NULL,
	sensorId varchar(255) NOT NULL
)

INSERT INTO SensorState (time, value, type, node, sensorId) VALUES(
CURRENT_TIMESTAMP,
'53.6',
'type',
'testNode',
'testSensor'
)


DROP TABLE SensorState
