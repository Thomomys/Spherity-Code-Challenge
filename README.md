# Template Code Challenge - Back-End Engineer ( Spherity )

## In concrete terms, this means the following:

- We ask you to build an API which supports a common CRUD pattern. Please include the operations for Create, Read, Update and Delete
- The user should be able to interact via the API with an entity called “secretNote”
- The entity should support the fields “note” and “id”

Take the following user scenarios to build the business logic

- As a user, I want to
  - store a note, which will be encrypted on the API and stored in the database.
  - retrieve a list of all my stored notes (only the necessary information like a creation date and an id).
  - retrieve a single note - where the api returns the decrypted value.
  - retrieve a single note - where the api returns the encrypted value.
  - delete a single note with a given id.
  - update a single note with a given id and a new note which gets encrypted again.

**Note:** Assume that your application is only going to be used by a single user who controls the key of the API. So only care about the entity ‘secretNote’ - User management and authentication is not part of the challenge.

## The following basic conditions apply:

- Implement the challenge using the following technologies
  - TypeScript <img src="https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg" align="center" height="20">
  - NestJS <img src="https://nestjs.com/img/logo-small.svg" align="center" height="20" />
  - Database of your choice
  - Jest as testing framework
- Use an encryption type of your choice and explain why you chose it.
- Write test cases for the most critical code sections.
- Work on your solution in a public repository on GitHub.
- Your application should be packaged in a container and can be run using docker.
- Also write an example GitHub Actions workflow for building your application.
- Feel free to extend the conditions with something special that you have learned in your previous jobs and fits into the project.

Build a working prototype with these guidelines, which you can show us in a mini demo.
Afterwards you explain code that stands out to you and the decisions you had to make during your challenge.

The goal of the challenge is not to check if your code looks perfect - It’s about getting to know your problem solving and interdisciplinary skills.

If you are ready to present your challenge, please write us back with the dates and time when you are available. Plan about 1 hour for the presentation of your solution. Please also share the link to your repo on Github in that mail.

We are looking forward to your solution. If you have any questions about your challenge, please feel free to contact Konstantin <konstantin.tsabolov@spherity.com>. If you have any further questions according to the HR side, feel free to contact me <carolina.rocha@spherity.com>.

## Running the app

1. #### Installation

   ```bash
   yarn run install
   ```

2. #### Configure environment

   - Copy `.env.example` file and paste it within same directory
   - Rename it as `.env`
   - Configure `port` and `database environemnt`

3. #### Runing the app

   ```bash
   yarn run start
   ```

   You can see swagger doucmentation at <http://localhost:3000/swagger>

4. #### Runing the unit test

   ````bash
   yarn run test
   ```-
   ````
