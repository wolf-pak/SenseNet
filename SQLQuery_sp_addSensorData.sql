/*    ==Scripting Parameters==

    Source Server Version : SQL Server 2016 (13.0.1742)
    Source Database Engine Edition : Microsoft SQL Server Enterprise Edition
    Source Database Engine Type : Standalone SQL Server

    Target Server Version : SQL Server 2017
    Target Database Engine Edition : Microsoft SQL Server Standard Edition
    Target Database Engine Type : Standalone SQL Server
*/

USE [SensorCloudDB]
GO
/****** Object:  StoredProcedure [dbo].[addSensorData]    Script Date: 2019-03-05 17:04:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE addSensorData
@time datetime, 
@value varchar(255), 
@type varchar(255), 
@node varchar(255), 
@sensorId varchar(255)
AS
BEGIN

INSERT INTO SensorState (time, value, type, node, sensorId)
VALUES (@time, @value, @type, @node, @sensorId) 

END