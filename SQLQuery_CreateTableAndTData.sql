CREATE TABLE SensorState(
	id int NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	time datetime NOT NULL,
	value varchar(255) NULL,
	node varchar(255) NULL,
	sensorId varchar(255) NULL
)

INSERT INTO SensorState (time, value, node, sensorId) VALUES(
CURRENT_TIMESTAMP,
'53.6',
'testNode',
'testSensor'
)


SELECT * FROM SensorState
