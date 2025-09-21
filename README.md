# LibraryManagementSystem_BassamBanyAli


Setup Instructions:

1-Clone the repository

2-Set up the database

Run the provided librarySystem.sql to create tables and stored procedure.

3- Update the connection string in appsettings.json:

4- Run the backend API

5-Configure the frontend (Angular)

npm install

Open src/environments/environment.ts and update the apiUrl with the backend URL

6-ng serve --open



Challenges Faced

1- Understanding Onion Architecture + DDD
Structuring the solution with clear separation of concerns (Domain, Application, Infrastructure, API) was challenging.

2- Managing Many-to-Many Relationship (Books ↔ Categories)
EF Core many-to-many with a junction table was tricky when creating or updating a book with multiple categories.

3- Time Management

Balancing my current work and completing this task within the deadline required careful planning.

AI Tool Usage

I used ChatGPT to assist in the following areas:

1-Planning the task, understanding each requirement, and outlining the process.

2-Studying Onion Architecture structure to build the solution correctly.

3-Writing and understanding stored procedures in SQL.

4-Implementing business logic and EF Core queries for managing books and categories, including handling the junction table.

5-Generating sample Angular Material form layouts for CRUD operations.


Prompts Used:

1-How to call a stored procedure using ADO.NET in .NET Core?

2-Give me a simple Angular Material HTML page for CRUD operations on categories with columns for name and ID

3-I can’t add a book with multiple categories in a many-to-many relationship. Give me a full example and explain everything.





