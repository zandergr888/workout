# Full Stack Workout Tracker (MERN Stack)

Welcome to the Full Stack Workout Tracker project! This application is built using the MERN stack, a popular full-stack JavaScript solution that helps in building fast, robust, and maintainable production web applications.

## Tech Stack

The main technologies used in this project are:

- **MongoDB**: A document-oriented NoSQL database used for high volume data storage.
- **Express.js**: A back-end web application framework for Node.js designed for building web applications and APIs.
- **React.js**: A JavaScript library for building user interfaces, specifically single page applications.
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine. It is used here to build the server-side of the application.

Other key technologies include React Native for the mobile front-end, Mongoose for object modeling with MongoDB, and Axios for making HTTP requests.

## Project Overview

The Full Stack Workout Tracker allows users to track their workout routines. You can add workouts with custom sets, reps, and weights, and the application will store and display all your workouts for each date.

### Sample Photos/Videos

![](https://github.com/zandergr888/workout/blob/main/demo.png)

This is a sample picture of the UI. You can navigate between days and click on each workout that you added. Each workout is then added to the backend server. Each workout is then displayed since the front end and back end interact with each other. 

## Getting Started

1. Clone this repository:
    ```
    git clone https://github.com/zandergr888/workout.git
    ```

2. Install all dependencies:
    ```
    cd workout
    npm install
    ```

3. Start the server:
    ```
    npm start
    ```

4. Connect to the MongoDB database:
    You'll need to create a `.env` file in the root of your project with your MongoDB URL:
    ```
    MONGODB_URL=mongodb://your-mongodb-url
    ```

5. Run the front-end React Native app:
    Navigate to the front-end directory and start the app:
    ```
    cd client
    npm start
    ```

**NOTE**: Make sure MongoDB, Node.js, and React Native are properly installed and configured on your machine before running the application.

## Contribution

Contributions, issues, and feature requests are welcome!

## Contact

Your Name - alex.hoang@utexas.edu

Project Link: https://github.com/zandergr888/workout.git
