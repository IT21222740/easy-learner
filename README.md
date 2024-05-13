# Academia Docker Deployment Guide

This guide will walk you through the process of deploying the Academia application using Docker.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Docker: https://docs.docker.com/get-docker/
- Git: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

## Step 1: Clone the Repository

Clone the Easy Learner repository from GitHub:

```bash
git clone https://github.com/IT21222740/easy-learner



Step 2: Add Environment Variables
Navigate to the root directory of the cloned repository and add the necessary 
environment variables by creating a .env file. You can copy the sample .env.example 
file provided and customize it as needed.

Step 3: Deploy the Docker Application
Run the following command to deploy the Docker application using Docker Compose. 
This command will build the Docker images and start the containers:

docker-compose up --build -V


Step 4: Set up the Frontend
Navigate to the frontend directory:


cd frontend


Install the required dependencies:

npm install

Start the frontend server:
npm start


Once the Docker containers are up and running, you can access the Easy Learner application by opening a web browser and navigating to http://localhost:3000.
