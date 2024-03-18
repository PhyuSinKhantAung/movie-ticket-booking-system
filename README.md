# Movie Ticket Booking System Backend API

Welcome to the backend API repository for the Movie Ticket Booking System. This API is built using Express.js and Node.js, with MongoDB as the database. It provides functionality for user authentication using JWT tokens, including refresh token logic. Additionally, it offers authorization features such as restricting certain actions to admin users only, like creating movies or changing movie statuses.

## Features

- **Authentication**: Utilizes JWT tokens for user authentication with refresh token logic.
- **Authorization**: Implements role-based authorization, allowing only admin users to perform certain actions.
- **Image Upload**: Supports image uploads to Cloudinary using Multer for movie-related content.
- **Forgot Password**: Implements a mail system for the forgot password logic, allowing users to reset their passwords via email.
- **Movie Management**: Provides functionality for managing movies, including creation, modification, and status changes.
- **Cinema Company and Venue Management**: Supports multiple cinema companies and their respective venues, allowing users to book movies at specific venues.
- **Seat Reservation**: Allows admin users to insert seats for specific dates and movies, enabling users to book seats for their chosen movies.

## Tech Stack

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **MongoDB**: NoSQL database for storing application data.
- **JWT Authentication**: Token-based authentication using JSON Web Tokens.
- **Cloudinary**: Cloud-based image and video management service for image uploads.
- **Multer**: Middleware for handling multipart/form-data, used for file uploads.
- **Mailgun**: Module for sending emails from Node.js applications, utilized for the forgot password feature.

## Getting Started

To get started with this API, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Create a `.env` file in the root directory of the project.
4. Set up your environment variables in the `.env` file:
   ```
   PORT=3000
   MONGODB_URI=<Your MongoDB connection URI>
   REFRESH_TOKEN_SECRET=<Your Refresh Token Secret>
   ACCESS_TOKEN_SECRET=<Your Access Token Secret>
   MAILGUN_DOMAIN=<Your Mailgun domain>
   MAILGUN_API_KEY=<Your Mailgun API key>
   CLOUDINARY_CLOUD_NAME=<Your Cloudinary cloud name>
   CLOUDINARY_API_KEY=<Your Cloudinary API key>
   CLOUDINARY_API_SECRET=<Your Cloudinary API secret>
   ```
5. Run the server using `npm run dev`.
