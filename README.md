# MERN Stack Fitness Tracker

A sophisticated full-stack web application crafted to aid users in monitoring and efficiently tracking their workout routines. Powered by MongoDB, Express.js, React, and Node.js (MERN Stack).

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Sample Photos](#sample-photosvideos)
- [Technology Stack](#technology-stack)
- [Installation & Setup](#installation-&-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)


## Overview

The Fitness Tracker offers an immersive user interface, enabling users to seamlessly log and visualize their workouts. Combined with a user-oriented calendar navigation and intricate performance analytics, it's tailored to propel users towards their fitness aspirations.

## Features

- **User Authentication**: Robust user authentication with bcrypt password hashing and JWT session management.
- **Workout Logging**: An intuitive platform for users to detail their workouts – from type to sets, reps, and duration.
- **Progress Visualization**: Witness fitness progress through a compelling ring indicator.
- **Date Navigation**: Effortlessly navigate through dates to reminisce or plan workouts.

### Sample Photos/Videos

![](https://github.com/zandergr888/workout/blob/main/demo1.png)
![](https://github.com/zandergr888/workout/blob/main/demo5.png)
![](https://github.com/zandergr888/workout/blob/main/demogif2.gif)


This is a sample picture of the UI. You can navigate between days and click on each workout that you added. Each workout is then added to the backend server, which is also displayed on the above picture. Each workout is then displayed since the front end and back end interact with each other. Furthermore, you can login and only display your own workouts. 

Published page HERE for demo - https://expo.dev/@alexanderhoang/WorkoutApp3?serviceType=classic&distribution=expo-go



## Technology Stack

- **Backend**:
  - **Express.js**: A lightweight, fast, and flexible framework that powers the backend.
  - **Node.js**: Ensures efficient and scalable server-side operations.
  - **RESTful API Design**: Provides seamless communication between front-end and back-end.
  - **Error Handling & Data Validation**: Ensures data integrity and robust application behavior.
  - **Mongoose ODM**: Simplifies interaction with MongoDB by modeling application data.
  
- **Frontend**: 
  - **React**: Powers the dynamic UI components, offering users an engaging experience.
  - **React Native Components**: Ensures the application is mobile-responsive and consistent across platforms.
  - **Context API**: Manages global state throughout the app.
  - **Axios**: Facilitates API requests, bridging the frontend and backend seamlessly.
  - **Custom Hooks**: Enhances component logic and reusability.
  
- **Database**: 
  - **MongoDB**: A NoSQL database that offers flexibility and scalability.
  - **Atlas**: MongoDB's cloud database service ensures data is easily accessible and secure.
  
- **Authentication & Security**: 
  - **Bcrypt**: Safeguards user passwords with advanced hashing techniques.
  
- **Deployment & DevOps**:
  - **AWS EC2**: Hosts the application, ensuring high uptime and availability.
  
## Installation & Setup

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/YOUR_USERNAME/fitness-tracker.git
    cd fitness-tracker
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    cd client && npm install
    ```

3. **Setup Environment Variables**: Draft a `.env` at the root with the required environment variables.
    ```env
    DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/fitness-tracker?retryWrites=true&w=majority
    JWT_SECRET=YOUR_SECRET_KEY
    ```

4. **Execute Locally**:
    ```bash
    npm run dev
    ```

## Usage

- **New User Registration**: Head to the 'Register' page, provide your credentials and get started!
- **Log a Workout**: Once authenticated, choose your date, spill your workout details, and save.
- **View Progress**: The dashboard showcases a vivid ring indicator reflecting your performance against set goals.

## API Endpoints

- `/api/register`: Registers a new user with a POST request.
- `/api/login`: Authenticates an existing user with a POST request.
- `/api/workouts`: Retrieves user workouts with a GET and logs a new workout with POST.



