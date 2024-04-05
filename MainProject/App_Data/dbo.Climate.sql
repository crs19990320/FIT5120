CREATE TABLE [dbo].[Climate]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [state] VARCHAR(50) NULL, 
    [state_lat] FLOAT NULL, 
    [state_long] FLOAT NULL, 
    [temp_change] FLOAT NULL, 
    [avr_rainfall] FLOAT NULL
)
