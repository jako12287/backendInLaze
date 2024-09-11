<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

A simple application built with NestJS. This project demonstrates how to set up and use NestJS with TypeScript for server-side development.

## Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>

2. **Install Dependencies**

   Run the following command to install the necessary dependencies:

   ```bash
   npm install

3. **Create a Configuration File**

   Create a file named `.env` in the root directory of the project with the following structure:

   ```typescript
  
     MONGO_URI=your_database_connection_string
     JWT_SECRET=your_jwt_secret
   


### API Documentation

#### [Base URL](http://localhost:3000/api)


#### Endpoints

- **Register a New User**
  - **Method:** `POST`
  - **Route:** `/users/register`
  - **Description:** Registers a new user.

- **Get a User by ID**
  - **Method:** `GET`
  - **Route:** `/users/:id`
  - **Description:** Retrieves a user by their ID.

- **Get All Users**
  - **Method:** `GET`
  - **Route:** `/users`
  - **Description:** Retrieves all users.

- **Update a User by ID**
  - **Method:** `PUT`
  - **Route:** `/users/:id`
  - **Description:** Updates a user by their ID.

- **Soft Delete a User by ID**
  - **Method:** `DELETE`
  - **Route:** `/users/:id`
  - **Description:** Soft deletes a user by their ID.
