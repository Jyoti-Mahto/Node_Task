# User Registration and Authentication API

This project is a Node.js application for user registration and authentication, featuring email verification and JSON Web Token (JWT) based authentication.

## Technologies Used
- Node.js
- Express.js
- mysql2 (for writing asynchronous code)
- bcryptjs
- jsonwebtoken
- nodemailer

## Initial Requirements
- Edit '.env' file 
    - JWT_SECRET=your_jwt_secret_key
    - EMAIL_USER=your_email@gmail.com
    - EMAIL_PASS=your_email_password

- Run the below query to setup the mysql requirement 
    - [ CREATE DATABASE registration;
        USE registration;

        CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        isVerified BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ); ]

- Edit in db.js
    - host:"localhost",
    - user:"your user name",
    - password:"your password",
    - database: "registration"

-----------------------------------------------------------------------------------------------

## Install all the dependencies
    -- npm i

## Run the application
    -- npm run start

-----------------------------------------------------------------------------------------------

###### For Endpoints you can import attached postman collection

---------------------------------------------------------------------------------------------------

## Features

- User registration with hashed passwords.
- Email verification using a verification token.
- User login with JWT authentication.
- Protected routes requiring a valid JWT token.

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

