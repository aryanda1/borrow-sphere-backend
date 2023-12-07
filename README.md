# Borrow-sphere

The express server for borrow-sphere. Allows users to put up requests for day-to-day utilities (like chargers, and other electronic devices) to quickly borrow/lend items within a small community.

Built using ExpressJS & Mongoose (take a look at src/models to see the schemas used and the collections you should set up).

## Installation

- Clone the repository
- Install the dependencies listed in package.json using `npm install`
- Run the app using `npm start`
- Create .env file in home directory and add below content there
  ```
  DATABASE_URI=your_database_link
  REFRESH_TOKEN_SECRET=your_refresh_token_secret
  ACCESS_TOKEN_SECRET=your_access_token_secret
  ```
