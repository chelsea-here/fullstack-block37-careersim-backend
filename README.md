# Fullstack Career Simulation - Backend - Block 37:

## database schema located here: https://excalidraw.com/#json=ht3NqlA9SXgEqEuei1rNQ,XcbbS4wNxKbO4mmmRTKpLQ

## project management / kanban : https://github.com/users/chelsea-here/projects/6

## Overview

- In this Career Simulation, Calliope asks you to create the back end of a review site for one of Fullstack Solutions' clients. After the back end has been completed, the client will review and provide feedback for improvement before starting the front end at a later time.

## Instructions

- Calliope has requested that you build the back end first at the client's request. For you to have a full understanding of the full-stack application, review the following requirements for each user experience:

## AS A USER (NOT LOGGED IN), I SHOULD BE ABLE TO:

- Access the website via the Internet so I can browse and read reviews.
- View details for a specific reviewed item (store, restaurant, product, book, etc.)
- I should be able to see the item’s average score or rating.
- I should be able to see any relevant information about the item.
- Search for specific items, so I can see their scores and read reviews about them.
- Sign up for an account so I can have a logged-in experience.
- Log in to the site if I already have an account.

## AS A LOGGED-IN USER, I SHOULD BE ABLE TO:

- Write and submit a review for an item that includes:
- A written text review
- A score/rating
- Only one review should be allowed per item, per user
- View a list of all the reviews I have written.
- Delete reviews I have written.
- Edit reviews I have written.
- Change the text review.
- Modify the score/rating.

## AS AN ENGINEER, I SHOULD:

- Have a well-seeded database so that I can simulate several different scenarios for the user stories below.
- By doing this, you set yourselves up to tackle many of the points throughout the tiers. In the long run, this will potentially save you tons of time.
- Also, add a bunch of users with reviews so the review editing features can be worked on without already having the “write a review” functionality built.
- Have secured user data so that no one can unrightfully manipulate information.

## Required routes:

- POST /api/auth/register

- POST /api/auth/login

- GET /api/auth/me 🔒

- GET /api/items

- GET /api/items/:itemId

- GET /api/items/:itemId/reviews

- GET /api/items/:itemId/reviews/:reviewId

- POST /api/items/:itemId/reviews 🔒

- GET /api/reviews/me 🔒

- PUT /api/users/:userId/reviews/:reviewId 🔒

- DELETE /api/users/:userId/reviews/:reviewId 🔒

---

# Template Install Instructions:

# Description

- this is a bare bones fullstack vite-react-express template. follow the steps below for setup

# Setup

- create database

```
createdb some_db_name

OR

> psql
> CREATE DATABASE some_db_name;
```

- install dependencies

```
npm install && cd client && npm install
```

- start express server in root directory of repository

```
npm run start:dev
```

- start vite server in client directory

```
npm run dev
```

# to test deployment

```
cd client && npm run build
```

browse to localhost:3000 (or whatever server port you used)

# to deploy

- build script for deploy

```
npm install && cd client && npm install && npm run build

```

- start script for deploy

```
node server/index.js

```

- environment variables for deployed site

```
JWT for jwt secret
DATABASE_URL for postgres database
```
