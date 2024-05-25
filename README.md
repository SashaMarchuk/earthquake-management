# Earthquake Management Application

This project is an Earthquake Management Application built with NestJS for the backend and ReactJS for the frontend. It uses PostgreSQL as the database and GraphQL for API requests. The project is containerized using Docker.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Clone the Repository

First, clone the repository to your local machine:

```bash

Environment Variables
Create a .env file in the root directory of the project and add the following environment variables. These variables are used to configure the PostgreSQL database and other settings.

.env

# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=earthquake_db
Build and Run with Docker
To build and run the application with Docker, follow these steps:

Build the Docker Containers:

docker-compose build
Run the Docker Containers:

docker-compose up
This command will start three services:

db: PostgreSQL database
backend: NestJS backend server
frontend: ReactJS frontend server
Access the Application:

The frontend will be available at http://localhost:3001
The backend GraphQL playground will be available at http://localhost:3000/graphql
Summary
Clone the repository.
Set up the environment variables in a .env file.
Build the Docker containers with docker-compose build.
Run the Docker containers with docker-compose up.
Access the frontend at http://localhost:3001 and the backend GraphQL playground at http://localhost:3000/graphql.
