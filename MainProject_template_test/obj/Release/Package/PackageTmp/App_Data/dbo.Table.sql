CREATE TABLE [dbo].[QuestionTable] (
    [Id]          INT          NOT NULL,
    [Question]    VARCHAR (MAX) NOT NULL,
    [WaterCredit] INT NULL,
    [CarbonCredit]   INT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

