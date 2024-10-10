# ImageProcessingSystem
# Image Processing System

This project is an image processing system built with Node.js. It uses a RESTful API to accept image processing requests, processes images using `sharp` for compression, and manages job queues with `bull` and Redis. The processed images are saved locally, and the status of each job is stored in a MongoDB database.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)
- [Troubleshooting](#troubleshooting)

## Features

- **CSV File Upload**: Accepts CSV files containing image URLs for processing.
- **Image Compression**: Compresses images using the `sharp` library and stores them locally.
- **Job Queue Management**: Manages processing jobs using `bull` and Redis for efficiency and reliability.
- **Status Tracking**: Tracks the status of each request (e.g., processing, completed, failed) and stores it in MongoDB.
- **RESTful API**: Provides endpoints for uploading files, checking status, and retrieving results.

## Technologies Used

- Node.js
- Express.js
- Bull (for job queue management)
- Redis (for queue management)
- MongoDB (for data storage)
- Mongoose (for MongoDB interaction)
- Sharp (for image compression)
- Axios (for fetching images)
- Multer (for handling file uploads)

## Project Structure

## Install Dependencies
- npm install

## Run Project
- npm start
- npx nodemon server.js
