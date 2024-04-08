CREATE TABLE [dbo].[CurrentNewMap] (
    [Id]                      INT          NOT NULL,
    [state]                   VARCHAR (50) NULL,
    [state_lat]               FLOAT (53)   NULL,
    [state_long]              FLOAT (53)   NULL,
    [Temperature]             INT   NULL,
    [net_emissions]           INT   NULL,
    [rainfall_percentage]     INT   NULL,
    [total_water_use]         INT   NULL,
    [total_water_consumption] INT   NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

