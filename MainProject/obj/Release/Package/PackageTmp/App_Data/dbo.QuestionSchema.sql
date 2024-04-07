CREATE TABLE [dbo].[QuestionSchema]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Questions] VARCHAR(MAX) NULL, 
    [Answer1] VARCHAR(MAX) NULL, 
    [Answer2] VARCHAR(MAX) NULL, 
    [A1Carbon] INT NULL, 
    [A1Water] INT NULL, 
    [A1EcoLife] INT NULL, 
    [A2Carbon] INT NULL, 
    [A2Water] INT NULL, 
    [A2EcoLife] INT NULL
)
