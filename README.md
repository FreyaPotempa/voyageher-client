# Voyageher

Welcome to the Voyageher repository! This is the client side of the Voyageher application, a travel tour application capstone for [Nashville Software School C62](https://github.com/nss-day-cohort-62). Built by [Freya Potempa](https://github.com/FreyaPotempa).

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Local Setup](#local-setup)
  - [Installation](#installation)
- [Technologies Used](#technologies-used)

## Introduction

In this React App, users can interact with the site unauthenticated, or register as Travelers or Guides. All users are able to view and sort events, as well as view the site in multiple languages.

Guides are able to CRUD events. Travelers are able to join or leave events and rate and review guides.

## Features

Unauthenticated Users:

- View events and event details
- View Guides with their ratings and reviews
- Sort events by date and city
- View the site in different languages

Guide Users:

- Create new events with image upload
- Edit their existing events
- Delete their existing events
- View their ratings and reviews
- Edit their profile image and bio

Traveler Users:

- Join or Leave Events
- Rate and review guides
- View their joined events
- Edit their profile image and bio

## Local Setup

If you would like to test this code locally, follow these steps:

### Installation

1. Clone the repository to your local machine

   ```bash
   git clone git@github.com:FreyaPotempa/voyageher-client.git

   ```

2. Navigate to the project directory

   ```bash
   cd voyageher-client

   ```

3. Install the dependencies
   ```bash
   npm install
   npm start
   ```

For more information on React, Chakra UI and i18next:
[![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=white)](https://legacy.reactjs.org/docs/getting-started.html)
[![Chakra UI](https://shields.io/badge/chakra--ui-black?logo=chakraui&style=for-the-badge%22)](https://chakra-ui.com/getting-started)
[![i18next](https://img.shields.io/badge/i18-next-blue)](https://www.i18next.com/overview/getting-started)

## Technologies Used

- React
- Chakra UI
- React-Calendar
- i18next
- Cloudinary
